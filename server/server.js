// load env var # tag-1
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process);
// console.log(process.env);

// import deps # tag-2
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const Note = require("./models/note.model.js");
const { home, fetchNotes, createNote, findNote, updateNote, deleteNote } = require("./controllers/notes.controller.js");
const cors = require("cors");

// create express app instance # tag-3
const app = express();
// config express # tag-4
app.use(express.json());
app.use(cors());

// connect  to db # tag-5
connectToDb();

// middleware

// routing // # tag-6
// home //
app.get("/", home);
// notes //
app.get("/notes", fetchNotes);
// create new notes //
app.post("/notes", createNote);
// find specific note //
app.get("/notes/:id", findNote);
// update
app.put(("/notes/:id"), updateNote);
// delete
app.delete(("/notes/:id"), deleteNote);

// start server # tag-7
app.listen(process.env.PORT, () => {
  console.log("Server is running...3000");
});