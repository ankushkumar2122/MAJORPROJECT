const { ref } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;
main().then(() => console.log("Connection successful")).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}



const userSchema = new Schema({
    username: String,
    email: String,

});
const postSchema=new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
});
const user= mongoose.model("user",userSchema);
const post= mongoose.model("post",postSchema);
const addData=async()=>{
    let user1=new user({
        username:"Ankush kumar",
        email:"ankush@gmail.com"
    });
    let post1=new post({
        content:"hello world",
        likes:7
    });
    post1.user=user1;
    await user1.save();
   await post1.save();
};
addData();