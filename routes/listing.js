const express = require("express");
const router = express.Router();
const wrapasyc = require("../utils/wrapasyc.js");
<<<<<<< HEAD
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
=======
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
>>>>>>> ef424c4 (database uri change)
.get( wrapasyc(listingcontroller.showListing))
.put(
    isLoggedIn,
    isOwner,
<<<<<<< HEAD
    upload.single("listing[image]"),
    validatelListing,
    wrapasyc(listingcontroller.updateListing))
.delete( isLoggedIn, isOwner, wrapasyc(listingcontroller.destroyListing)
);



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapasyc(listingcontroller.renderEditForm));

=======
    validatelListing,
    wrapasyc(listingcontroller.updateListing))
    delete( isLoggedIn, isOwner, wrapasyc(listingcontroller.destroyListing)
);
// index route
// router.get("/", wrapasyc(listingcontroller.index));



//show route
// router.get("/:id", wrapasyc(listingcontroller.showListing));
>>>>>>> ef424c4 (database uri change)

// app.get("/listings/app",(req,res)=>{
//     res.send("ankush")
// });

<<<<<<< HEAD
=======
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

>>>>>>> ef424c4 (database uri change)
module.exports = router;


