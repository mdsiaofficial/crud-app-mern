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
const { home, fetchNotes, createNote, findNote, updateNote, deleteNote } = require("./controllers/notes.controller.js");
// create express app instance
const app = express();
// config express
app.use(express.json());

// connect  to db
connectToDb();

// middleware

// routing //

// home //
app.get("/", home);

// notes //
app.get("/notes", fetchNotes);

// new notes //
app.post("/notes", createNote);

// find specific note //
app.get("/notes/:id", findNote);

// update
app.put(("/notes/:id"), updateNote);

// delete
app.delete(("/notes/:id"), deleteNote);

// start server
app.listen(process.env.PORT, () => {
  console.log("Server is running...3000");
});