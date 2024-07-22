if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const session = require("express-session");
const MongoStore = require('connect-mongo');
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
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const multer = require("multer");
const { storage } = require("./cloudConfig.js");
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("method"));
app.use(express.static(path.join(__dirname, "/public")));

// app.use((req, res, next) => {
//   req.setTimeout(500000); // 500 seconds timeout for requests
//   res.setTimeout(500000); // 500 seconds timeout for responses
//   next();
// });

const dbUrl = process.env.ATLASDB_URL;

const store = MongoStore.create({

  mongoUrl: dbUrl,
  crypto: {

    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,


});

store.on("error", () => {

  console.log("ERROR in MONGO SESSION STORE", err);
});


const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUnitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

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
// app.use(flash()); /////////jaha route define kiya h,usse pehle use karna pdega///////pehle flash aayga uske baad routes aaaynge
// app.use(passport.initialize()); ///////passport ko use krne se pehle usse initialize krna pdega
// app.use(passport.session()); //////passport.session() se baar baar same user ko login nhi krna pdta

//         ///////////////////app.use was here ////////req.flesh ,wala success ,error
// //// app.use((req, res, next) => {
// ////   res.locals.success = req.flash("success");
// ////   res.locals.error = req.flash("error");
// ////   next();
// //// });
// passport.use(new LocalStrategy(User.authenticate())); ////////pbkdf2 hashing algorithm used

// passport.serializeUser(User.serializeUser()); //// user se related jitni bhi informations h,usko store karana

// passport.deserializeUser(User.serializeUser()); ////user se related jitni bhi stored  information h, unko unstore krna

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   next();
// });

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

////////Review

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

///////////above code was working //////////

////////////////////////////OLD CODe ENDS HERRE///////////////////////////////

////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////
////////////////////////////OLD CODe ENDS HERRE///////////////////////////////

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
// const wrapAsync = require("./utils/wrapAsync");
// const ExpressError = require("./utils/ExpressError");
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////
////new code

////////////////////////////////////////////////////////////////////////////

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
// const wrapAsync = require("./utils/wrapAsync");
// const ExpressError = require("./utils/ExpressError");
// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");
// const Listing = require("./models/listing");
// const { listingSchema, reviewSchema } = require("./schema.js");
// const Review = require("./models/review.js");

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

// async function main() {
//   await mongoose.connect(MONGO_URL);
//   console.log("Connected to DB");
// }

// main().catch((err) => {
//   console.log(err);
// });

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
//   const { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("listings/error.ejs", { message });
// });

// app.listen(8080, () => {
//   console.log("Server is listening on port 8080");
// });

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// my gpt code ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError.js");
// const session = require("express-session");
// // const MongoStore = require("connect-mongo");
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");

// const listingRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// // const dbUrl = process.env.ATLASDB_URL;

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// // async function main() {
// //   await mongoose.connect(dbUrl);
// // }

// app.set("View engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));

// // app.use((req, res, next) => {
// //   req.setTimeout(500000); // 500 seconds timeout for requests
// //   res.setTimeout(500000); // 500 seconds timeout for responses
// //   next();
// // });

// // const store = MongoStore.create({
// //   mongoUrl: dbUrl,
// //   crypto: {
// //     secret: process.env.SECRET,
// //   },
// //   touchAfter: 24 * 3600,
// // });

// // store.on("error", ()=>{
// //   console.log("ERROR in MONGO SESSION STORE", err);
// // });

// const sessionOptions = {
//   secret: "mysupersecretcode",
//   resave: false,
//   saveUnitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// // app.get("/", (req, res)=>{
// //   res.send("Hi i am root");
// // });

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// // app.get("/demouser",async (req, res)=>{
// //   let fakeUser = new User({
// //     email: "student@gmail.com",
// //     username: "delta-student",
// //   });

// //   let registeredUser = await User.register(fakeUser,"helloworld");
// //   res.send(registeredUser);
// // })

// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found:"));
// });

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("listings/error.ejs", { message });
//   //  res.status(statusCode).send(message);
// });

// app.listen(8080, () => {
//   console.log("Server is listening to post 8080");
// });

// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const session = require("express-session");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const methodOverride = require("method-override");
// const mongoose = require("mongoose");
// const path = require("path");
// const ejsMate = require("ejs-mate");
// const multer = require("multer");
// const { storage } = require("./cloudConfig.js");
// const upload = multer({ storage });

// const User = require("./models/user.js");
// const Listing = require("./models/listing");
// const Review = require("./models/review.js");

// const wrapAsync = require("./utils/wrapAsync");
// const ExpressError = require("./utils/ExpressError");
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

// // Set request and response timeout
// app.use((req, res, next) => {
//   req.setTimeout(500000); // 500 seconds timeout for requests
//   res.setTimeout(500000); // 500 seconds timeout for responses
//   next();
// });

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
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.error("Connection error", err);
//   });

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
// }

// app.get("/", (req, res) => {
//   res.send("Server is working");
// });

// app.use("/listings", listingRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// app.all("*", (req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "Something went wrong" } = err;
//   res.status(statusCode).render("listings/error", { message });
// });

// app.listen(8080, () => {
//   console.log("Server is listening on port 8080");
// });
