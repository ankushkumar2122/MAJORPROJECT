const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapasyc = require("../utils/wrapasyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require('../models/review.js');
const Listing = require("../models/listing.js")
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
<<<<<<< HEAD
const reviewController=require("../controllers/reviews.js");



//revies post
router.post("/", isLoggedIn, validateReview, wrapasyc(reviewController.creatReview));
//delete revies route 
router.delete("/:reviewId", 
    isLoggedIn,
     isReviewAuthor,
      wrapasyc(reviewController.destroyReview)
=======




const reviewController=require("../controllers/reviews.js");
//revies post
router.post("/", isLoggedIn, validateReview, wrapasyc(reviewController.creatReview));
//delete revies route 
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapasyc(reviewController.destroyReview)
>>>>>>> ef424c4 (database uri change)
);

module.exports = router;