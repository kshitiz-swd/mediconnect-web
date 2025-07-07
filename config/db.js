
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

const DBconnect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); 
  }
};

module.exports = DBconnect; 
