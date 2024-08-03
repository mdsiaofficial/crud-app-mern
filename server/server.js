// load env var
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process);
// console.log(process.env);

// import deps
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const Note = require("./models/note.model.js");
// create express app instance
const app = express();
// config express
app.use(express.json());

// connect  to db
connectToDb();

// middleware

// routing //

// home //
app.get("/", (req, res) => {
  console.log("Starts here");
  res.status(200).send("Start server");
})

// notes //
app.get("/notes", async (req, res) => {
  console.log("Notes here...");
  res.status(201).send("Notes here...");
});

// new notes //
app.post("/notes", async (req, res) => {
  // 1 - get the sent in data from frontend to backend
  const { title, body } = req.body;
  console.log(title, body);
  // 2 - create a note
  const newNote = await Note.create({
    title,
    body,
  });
  console.log(newNote);
  // 3 - res with new note
  res.status(201).json({
    note: newNote
  });
});


// start server
app.listen(process.env.PORT, () => {
  console.log("Server is running...3000");
});