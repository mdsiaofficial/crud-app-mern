const mongoose = require("mongoose");
module.exports = async () => {
  // Connect to your MongoDB database here
  console.log(`hello`);
  try {
    await mongoose.connect(process.env.DB_URL);
    
  } catch (error) {
    console.log(error);
  }
};