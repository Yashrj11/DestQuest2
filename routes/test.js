// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     res.redirect("/listings");
//   }
// );

const wrapAsync = require("../utils/wrapAsync");

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {
    try {
      req.flash("success", "Welcome Back");
      let redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
    } catch (err) {
      console.log(err);
    }
  })
);



// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     console.log("Authentication successful, setting flash message");
//     req.flash("success", "Welcome to Wanderlust! You are logged in.");
//     console.log("Redirecting to /listings");
//     res.redirect("/listings");
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome to Wanderlust! You are logged in.");
//     console.log("you have logged in successfully");
//     res.redirect("/listings");
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   wrapAsync(async (req, res) => {
//     try {
//       req.flash("success", "Welcome Back");
//       let redirectUrl = res.locals.redirectUrl || "/listings";
//       res.redirect(redirectUrl);
//     } catch (err) {
//       console.log(err);
//     }
//   })
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome Back");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl);
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     res.redirect("/listings");
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     res.redirect("/listings");
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: "Invalid username or password.",
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     res.redirect("/listings");
//   }
// );

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: "Invalid username or password.",
//   }),
//   wrapAsync(async (req, res) => {
//     try {
//       req.flash("success", "Welcome back to Wanderlust!");
//       res.redirect("/listings");
//     } catch (err) {
//       req.flash("error", err.message);
//       res.redirect("/login");
//     }
//   })
// );

// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login" }),
//   function (req, res) {
//     req.flash("success", "Welcome back to Wanderlust!");
//     res.redirect("/listings");
//   }

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     req.flash("error", "this is not working");
//     res.redirect("/listings");
//   }
// );

// router
//   .route("/login")
//   .get(userController.renderLoginForm)
//   .post(
//     saveRedirectUrl,
//     passport.authenticate("local", {
//       failureRedirect: "/login",
//       failureFlash: true,
//     }),
//     userController.login
//   );
