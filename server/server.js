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
  // find the notes
  const notes = await Note.find();
  // res.status(201).send("Notes here...");
  res.status(201).json({ notes: notes });
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

// find specific note //
app.get("/notes/:id", async (req, res) => {
  // get id off the url
  const noteId = req.params.id;
  // find the note using if
  const note = await Note.findById(noteId);
  // res the note
  res.status(202).json({
    note: note
  });
});

// update
app.put(("/notes/:id"), async (req, res) => {
  // get id
  const noteId = req.params.id;
  const { title, body } = req.body;
  // find and update
  const note = await Note.findByIdAndUpdate(noteId, {
    title: title,
    body: body
  }, { new: true }); // way 1 - cmd here to replace the old one

  console.log(note);

  // way 2 - find updated
  // const updatedNote = await Note.findById(noteId);
  
  // res new note
  res.status(202).json({ note: note });
})

// delete
app.delete(("/notes/:id"), async (req, res) => {
  // get id
  const noteId = req.params.id;

  // find and delete
  await Note.deleteOne({ _id: noteId }); 
  // res
  res.status(202).json({ message: "deleted" });
})

// start server
app.listen(process.env.PORT, () => {
  console.log("Server is running...3000");
});