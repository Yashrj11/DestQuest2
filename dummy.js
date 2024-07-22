// const express = require("express");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const path = require("path");
// const ejsMate = require("ejs-mate");
// const User = require("./models/user.js");

// const Listing = require("./models/listing");
// const wrapAsync = require("./utils/wrapAsync");
// const ExpressError = require("./utils/ExpressError");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");

// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");
// const app = express();

// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));

// app.use(express.static(path.join(__dirname, "/public")));

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const sessionOptions = {
//   secret: "mysupersecretcode",
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// app.use(session(sessionOptions));
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());

// // Custom Passport Local Strategy
// passport.use(
//   new LocalStrategy(async function (username, password, done) {
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username." });
//       }
//       const isValid = await user.authenticate(password);
//       if (!isValid.user) {
//         return done(null, false, { message: "Incorrect password." });
//       }
//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

// main()
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// app.get("/", (req, res) => {
//   console.log("server is working");
//   res.send("server is working");
// });

// // User routes
// app.use("/", userRouter);
// // Listing routes
// app.use("/listings", listingRouter);
// // Review routes
// app.use("/listings/:id/reviews", reviewRouter);

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found!!!!!!"));
// });

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong" } = err;

//   res.status(statusCode).render("listings/error.ejs", { message });
// });

// app.listen(8080, () => {
//   console.log("server is listening to port 8080");
// });

















// const sessionOptions = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUnitialized: true,
//   cookie: {
//     expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true, 
//   },
// };


// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) =>{
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });




















const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local"); ////////change here
const app = express();

const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const User = require("./models/user.js");
const Listing = require("./models/listing");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));
app.use(express.static(path.join(__dirname, "/public")));


const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash()); /////////jaha route define kiya h,usse pehle use karna pdega///////pehle flash aayga uske baad routes aaaynge
app.use(passport.initialize()); ///////passport ko use krne se pehle usse initialize krna pdega
app.use(passport.session()); //////passport.session() se baar baar same user ko login nhi krna pdta

        ///////////////////app.use was here ////////req.flesh ,wala success ,error
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

passport.use(new LocalStrategy(User.authenticate())); ////////pbkdf2 hashing algorithm used

passport.serializeUser(User.serializeUser()); //// user se related jitni bhi informations h,usko store karana

passport.deserializeUser(User.serializeUser()); ////user se related jitni bhi stored  information h, unko unstore krna


main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
  console.log("server is working");

  res.send("server is working");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

//////////Review

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!!!!!!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(8080, (req, res) => {
  console.log("server is listening to port 8080");
});



