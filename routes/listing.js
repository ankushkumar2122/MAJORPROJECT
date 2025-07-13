const express = require("express");
const router = express.Router();
const wrapasyc = require("../utils/wrapasyc.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validatelListing } = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");

router.route("/")
.get( wrapasyc(listingcontroller.index))
.post( isLoggedIn, wrapasyc(listingcontroller.createListing)
);

//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);
router.route("/:id")
.get( wrapasyc(listingcontroller.showListing))
.put(
    isLoggedIn,
    isOwner,
    validatelListing,
    wrapasyc(listingcontroller.updateListing))
    delete( isLoggedIn, isOwner, wrapasyc(listingcontroller.destroyListing)
);
// index route
// router.get("/", wrapasyc(listingcontroller.index));



//show route
// router.get("/:id", wrapasyc(listingcontroller.showListing));

// app.get("/listings/app",(req,res)=>{
//     res.send("ankush")
// });

//create route
// router.post("/", isLoggedIn, wrapasyc(listingcontroller.createListing)
// );
//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapasyc(listingcontroller.renderEditForm));
//update route
// router.put("/:id",
//     isLoggedIn,
//     isOwner,
//     validatelListing,
//     wrapasyc(listingcontroller.updateListing));
//delete route
// router.delete("/:id", isLoggedIn, isOwner, wrapasyc(listingcontroller.destroyListing)
// );

module.exports = router;


