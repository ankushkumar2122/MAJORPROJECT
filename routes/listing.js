const express = require("express");
const router = express.Router();
const wrapasyc = require("../utils/wrapasyc.js");
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validatelListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

// index route&//create route
router
.route("/")
.get( wrapasyc(listingcontroller.index))
.post( 
    isLoggedIn,
   
    upload.single("listing[image]"),
    validatelListing,
     wrapasyc(listingcontroller.createListing)
);



//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

//show route&//update route&//delete route
router
.route("/:id")
.get( wrapasyc(listingcontroller.showListing))
.put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatelListing,
    wrapasyc(listingcontroller.updateListing))
.delete( isLoggedIn, isOwner, wrapasyc(listingcontroller.destroyListing)
);



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapasyc(listingcontroller.renderEditForm));


// app.get("/listings/app",(req,res)=>{
//     res.send("ankush")
// });

module.exports = router;


