const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";


const dbUrl2 = "mongodb+srv://yashrjmourya11:vo4s4K5kSiHG6AJe@cluster0.owkmixi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl2);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "669ed2d2b0a7ae4b9411ac75",
  }));
  await Listing.insertMany(initData.data);

  console.log("data was initialized");
};

initDB();
