const mongoose = require('mongoose');
const { Schema } = mongoose;

const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: Stringg,
  country: String
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
