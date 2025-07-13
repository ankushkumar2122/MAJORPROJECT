const mongoose = require("mongoose");
const { Schema } = mongoose;
main().then(() => console.log("Connection successful")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}



const userSchema = new Schema({
  username: String, // Corrected to use String (Mongoose data type)
  addresses: [
    {
      location: String,
      city: String,
    },
  ],
});

const User = mongoose.model("User", userSchema); // Corrected the model name to "User" to follow standard capitalization conventions.

const addUsers = async () => {
  let user1 = new User({
    username: "Ankush",
    addresses: [
      {
        location: "Lusiana Punjab",
        city: "Ludhiana"
      }
    ]
  });

  // Add an additional address
  user1.addresses.push({ location: "Sasaram Fazalgang", city: "Sasaram" });

  let result = await user1.save();
  console.log(result);
};

addUsers();
