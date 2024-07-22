const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl, ////////////////yaha pr yeh req.session ko reset hone se bachchayga
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

/////////////////////////////////////////////  get signup//////////////////////////////////////////
// router.get("/signup", userController.renderSignupForm);

//////////////////////////////////post signup//////////////////////
// router.post("/signup", wrapAsync(userController.signup));

// router.get("/login", userController.renderLoginForm);

// router.post(
//   "/login",
//   saveRedirectUrl, ////////////////yaha pr yeh req.session ko reset hone se bachchayga
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   userController.login
// );

router.get("/logout", userController.logout);

module.exports = router;
