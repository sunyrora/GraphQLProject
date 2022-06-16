require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB conneted: ${conn.connection.host}`.cyan.underline.bold // colors package imported in server.js
    );
  } catch (error) {
    console.error("MongoDB connection FAIL. err: ", error);
    process.exit(1);
  }
};

module.exports = connectDB;
