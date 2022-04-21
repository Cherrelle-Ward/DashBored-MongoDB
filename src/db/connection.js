require("dotenv").config();
const mongoose = require("mongoose");

//We connect the DB from the env file where the connection string is based.
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Online");
  } catch (error) {
    console.log(error);
  }
};

connection();
