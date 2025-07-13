const mongoose = require("mongoose");
const { Schema } = mongoose;
main().then(() => console.log("Connection successful")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "order"
        }
    ]
});

// Use `function` instead of arrow functions in the middleware for correct `this` binding
// customerSchema.pre("findOneAndDelete",  async  () =>{
//     console.log("pre middleware");
// });
customerSchema.post("findOneAndDelete", async (customer) => {
    if (customer.orders.length) {
        let res = await order.deleteMany({ _id:{ $in: customer.orders }});
        console.log(res);
    }
});

const Order = mongoose.model("order", orderSchema);
const Customer = mongoose.model("customer", customerSchema);

const addCustomer = async () => {
    let cust1 = new Customer({
        name: "Ankush Kumar",
    });
    let order1 = await Order.findOne({ item: "chips" });
    let order2 = await Order.findOne({ item: "chocolate" });
    cust1.orders.push(order1);
    cust1.orders.push(order2);
    let result = await cust1.save();
    console.log(result);
};
addCustomer();

const addOrders = async () => {
    let res = await Order.insertMany([
        { item: "samosa", price: 12 },
        { item: "chips", price: 10 },
        { item: "chocolate", price: 20 },
    ]);
    console.log(res);
};
// Uncomment if needed
// addOrders();

const addCust = async () => {
    let newCust = new Customer({
        name: "Ankush Kumar"
    });
    let newOrder = new Order({
        item: "Burger",
        price: 250
    });
    newCust.orders.push(newOrder);
    await newOrder.save();
    await newCust.save();
    console.log("added new customer");
};

const delCust = async () => {
    let data = await Customer.findByIdAndDelete("66f59ff3efd871f2d0135797");
    console.log(data);
};
// Uncomment if needed
// addCust();
delCust();
