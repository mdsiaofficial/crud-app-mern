// load env var
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process);
// console.log(process.env);

// import deps
const express = require("express");
const connectToDb = require("./config/connectToDb.js");

// create express app instance
const app = express();

// connect  to db
connectToDb();

// middleware
// routing
app.get("/", (req, res) => {
  console.log("Starts here");
  res.status(200).send("Start server");
})
// start server
app.listen(process.env.PORT);