const Listing = require("../models/listing");
const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  console.log(req.user);
  // req.flash("success", "New Listing Created!!!");

  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid Listing ID");
  }
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    // throw new ExpressError(404, "Listing not found");

    req.flash("error", "Listing you requested for does not exist!!!!");
    res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geoCodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();

  console.log(savedListing);

  req.flash("success", "New Listing Created!!!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ExpressError(400, "Invalid Listing ID");
  }
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!!!!");
    res.redirect("/listings");

    // throw new ExpressError(404, "Listing not found");
  }

  // req.flash("success", "Listing is  Edited!!!");

  // let originalImageUrl = listing.image.url;
  // originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");

  // res.render("listings/edit.ejs", { listing, originalImageUrl });

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };
    await listing.save();
  }
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   throw new ExpressError(400, "Invalid Listing ID");
  // }

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }
  req.flash("success", " Listing Updated!!!");

  res.redirect(`/listings/${id}`);
};

// module.exports.destroyListing = async (req, res) => {
//   let { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new ExpressError(400, "Invalid Listing ID");
//   }
//   const deletedListing = await Listing.findByIdAndDelete(id);
//   if (!deletedListing) {
//     throw new ExpressError(404, "Listing not found");
//   }
//   console.log(deletedListing);
//   req.flash("success", " Listing Deleted!!!");

//   res.redirect("/listings");
// };

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
