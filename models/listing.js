// models/listing.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
<<<<<<< HEAD
const Review=require("./review.js");
const User = require("./user.js");
=======
const Review = require('./review');
const User = require('./user');
>>>>>>> ef424c4 (database uri change)


// Define the Listing schema
const listingSchema = new Schema({
  title: {     
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
<<<<<<< HEAD
  
=======
    url: String,
>>>>>>> ef424c4 (database uri change)
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: "Review",
  }],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
  
  // Add default value to ensure reviews field is always present
  default: [],
  geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
   
  },
  category:{
    type:String,
    enum:["mountain",]
  }
});

listingSchema.post("findOneAndDelete",async(listing)=> {
  if(listing){
    await Review.deleteMany({_id :{$in: listing.reviews}});
  }

=======
    ref: 'Review',
    default: [] // Ensure reviews are always an empty array by default
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
>>>>>>> ef424c4 (database uri change)
});

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post('findOneAndDelete', async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Export the model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
