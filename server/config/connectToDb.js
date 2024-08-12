const mongoose = require("mongoose");
const connectToDb = async () => {
  // Connect to your MongoDB database here # tag-14
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`[--Connected to database--]`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToDb;