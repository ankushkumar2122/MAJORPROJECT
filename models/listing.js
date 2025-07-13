// models/listing.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./review');
const User = require('./user');


// Define the Listing schema
const listingSchema = new Schema({
  title: {     
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review',
    default: [] // Ensure reviews are always an empty array by default
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
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
