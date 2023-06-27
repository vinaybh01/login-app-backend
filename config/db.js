const mongoose = require("mongoose");

const url =
  "mongodb+srv://vinay:vinay123@login.b3pis1w.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose
      .connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
