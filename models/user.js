const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});
///////passport local mongoose automatically add kar dega username aur hashed password aur salt field ......
////isliye sirf email define kare schema me

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

////////new code//////////

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const passportLocalMongoose = require("passport-local-mongoose");

// const userSchema = new Schema({
//   email: {
//     type: String,
//     required: true,
//   },
// });

// userSchema.plugin(passportLocalMongoose);
// module.exports = mongoose.model("User", userSchema);
