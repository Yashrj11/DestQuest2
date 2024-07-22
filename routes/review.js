const mongoose = require("mongoose");
const express = require("express");
const router = express.Router({ mergeParams: true });

///const router = express.Router({ mergeParams: true });//////aisa model jiske parent route ke andar kuch aise parameters jo
//calbacks ke andar use hote toh uske liye hamesha route define krte time "{mergeParams:true}"karna chahiye

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing");
const listings = require("../routes/listing.js");
const reviews = require("../routes/review.js");
const reviewController = require("../controllers/reviews.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

////////////////////post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

///////delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
