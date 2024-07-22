// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync");
// const { listingSchema, reviewSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError");

// const Listing = require("../models/listing");

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);

//   if (error) {
//     throw new ExpressError(400, error);
//   } else {
//     next();
//   }
// };

// //////////INDEX ROUTE

// router.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});

//     res.render("listings/index.ejs", { allListings });
//   })
// );

// ///////////////NEW ROUTE
// router.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// ////////////SHOW ROUTE
// router.get(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id).populate("reviews");

//     res.render("listings/show.ejs", { listing });
//   })
// );

// ///////////////CREATE ROUTE
// router.post(
//   "/",
//   validateListing,
//   wrapAsync(async (req, res, next) => {
//     // if (!req.body.listing) {
//     //   throw new ExpressError(400, "Send valid data for listing");
//     // }

//     const newListing = new Listing(req.body.listing);

//     // if (!newListing.title) {
//     //   throw new ExpressError(400, "Title is missing!!!");
//     // }

//     // if (!newListing.description) {
//     //   throw new ExpressError(400, "Description is missing!!!!");
//     // }

//     // if (!newListing.location) {
//     //   throw new ExpressError(400, "Location is missing!!!!!! ");
//     // }

//     // if (!newListing.country) {
//     //   throw new ExpressError(400, "Country is missing!!!!!!");
//     // }

//     await newListing.save();
//     res.redirect("/listings");
//   })
// );

// ////////EDIT ROUTE

// router.get(
//   "/:id/edit",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", { listing });
//   })
// );

// //////////////Update Route

// router.put(
//   "/:id",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     res.redirect(`/listings/${id}`);
//   })
// );

// //////////////Delete Route

// router.delete(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     let { id } = req.params;

//     let deletedListing = await Listing.findByIdAndDelete(id);
//     res.redirect("/listings");
//   })
// );

// module.exports = router;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
///////////new code ////////////
//////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError");

const Listing = require("../models/listing");

const flash = require("connect-flash");

const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// const validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);

//   if (error) {
//     throw new ExpressError(400, error);
//   } else {
//     next();
//   }
// };

router.route("/").get(wrapAsync(listingController.index)).post(
  isLoggedIn,
  // validateListing,
  upload.single("listing[image]"),
  wrapAsync(listingController.createListing)
);
// .post(upload.single("listing[image]"), (req, res) => {
//   //////upload.single image ko post krti h multer k through
//   res.send(req.file); //////multer me req.file use hota h
// });

///////////////NEW ROUTE
///////////////////////////////////////////////////////////////////////////////////////////////////////
// router.get("/new", isLoggedIn, (req, res) => {
//   res.render("listings/new.ejs");
// });

router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////INDEX ROUTE
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.get("/", wrapAsync(listingController.index));

///////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////SHOW ROUTE

// router.get("/:id", wrapAsync(listingController.showListing));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////CREATE ROUTE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.post(
//   "/",
//   isLoggedIn,
//   validateListing,
//   wrapAsync(listingController.createListing)
// );

////////EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////            Update Route
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// router.put(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   validateListing,
//   wrapAsync(listingController.updateListing)
// );

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                 Delete Route
///////////////////////////////////////////////////////////////////////////////////////////////////////

// router.delete(
//   "/:id",
//   isLoggedIn,
//   isOwner,
//   wrapAsync(listingController.destroyListing)
// );

module.exports = router;

///////////////////////new codeeeeeeeeeeeeeeeeeeeeee/////////////////////////////////////////
// const mongoose = require("mongoose");
// const express = require("express");
// const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync");
// const { listingSchema } = require("../schema.js");
// const ExpressError = require("../utils/ExpressError");
// const Listing = require("../models/listing");
// const flash = require("connect-flash");
// const { isLoggedIn } = require("../middleware.js");

// const validateListing = (req, res, next) => {
//   const { error } = listingSchema.validate(req.body);
//   if (error) {
//     throw new ExpressError(400, error.message);
//   } else {
//     next();
//   }
// };

// // INDEX ROUTE
// router.get(
//   "/",
//   wrapAsync(async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//   })
// );

// // NEW ROUTE
// router.get("/new", isLoggedIn, (req, res) => {
//   console.log(req.user);
//   if (!req.isAuthenticated()) {
//     req.flash("error", "You must be logged in to create a listing");
//     return res.redirect("/login");
//   }
//   res.render("listings/new.ejs");
// });

// // SHOW ROUTE
// router.get(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new ExpressError(400, "Invalid Listing ID");
//     }
//     const listing = await Listing.findById(id).populate("reviews");
//     if (!listing) {
//       req.flash("error", "The listing you requested does not exist");
//       return res.redirect("/listings");
//     }
//     res.render("listings/show.ejs", { listing });
//   })
// );

// // CREATE ROUTE
// router.post(
//   "/",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     req.flash("success", "New listing created!");
//     res.redirect("/listings");
//   })
// );

// // EDIT ROUTE
// router.get(
//   "/:id/edit",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new ExpressError(400, "Invalid Listing ID");
//     }
//     const listing = await Listing.findById(id);
//     if (!listing) {
//       req.flash("error", "The listing you requested does not exist");
//       return res.redirect("/listings");
//     }
//     req.flash("success", "Listing is edited!");
//     res.render("listings/edit.ejs", { listing });
//   })
// );

// // UPDATE ROUTE
// router.put(
//   "/:id",
//   validateListing,
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new ExpressError(400, "Invalid Listing ID");
//     }
//     const listing = await Listing.findByIdAndUpdate(id, {
//       ...req.body.listing,
//     });
//     if (!listing) {
//       throw new ExpressError(404, "Listing not found");
//     }
//     req.flash("success", "Listing updated!");
//     res.redirect(`/listings/${id}`);
//   })
// );

// // DELETE ROUTE
// router.delete(
//   "/:id",
//   wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       throw new ExpressError(400, "Invalid Listing ID");
//     }
//     const deletedListing = await Listing.findByIdAndDelete(id);
//     if (!deletedListing) {
//       throw new ExpressError(404, "Listing not found");
//     }
//     req.flash("success", "Listing deleted!");
//     res.redirect("/listings");
//   })
// );

// module.exports = router;
