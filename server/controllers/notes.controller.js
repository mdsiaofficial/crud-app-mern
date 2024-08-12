const Note = require("../models/note.model");

const home = (req, res) => {
  console.log("Starts here");
  res.status(200).send("Start server");
}

const fetchNotes = async (req, res) => {

  try {
    console.log("Notes here...");
    // find the notes # tag-9
    const notes = await Note.find({user: req.user._id});
    // res.status(201).send("Notes here...");
    res.status(201).json({ notes: notes });

  } catch (error) {
    console.error(error);
  }
}

const createNote = async (req, res) => {
  try {
    // 1 - get the sent in data from frontend to backend
    const { title, body } = req.body;
    // console.log(title, body);
    // 2 - create a note # tag-10
    const newNote = await Note.create({
      title,
      body,
      user: req.user._id // attach user to the note # tag-11
    });
    console.log(newNote);
    // 3 - res with new note
    res.status(201).json({
      note: newNote
    });
  } catch (error) {
    console.error(error);
  }
}

const findNote = async (req, res) => {
  try {
    // get id off the url
    const noteId = req.params.id;
    // find the note using if
    const note = await Note.findOne({_id:noteId, user: req.user._id});
    // res the note
    res.status(202).json({
      note: note
    });
  } catch (error) {
    console.error(error);
  }
}

const updateNote = async (req, res) => {
  try {
    // get id
    const noteId = req.params.id;
    const { title, body } = req.body;
    // find and update # tag-11
    const note = await Note.findOneAndUpdate({_id:noteId,user: req.user._id}, {
      title: title,
      body: body,
      user: req.user._id // attach user to the note # tag-11
    }, { new: true }); // way 1 - cmd here to replace the old one
  
    console.log(note);
  
    // way 2 - find updated # tag-12
    // const updatedNote = await Note.findById(noteId);
    
    // res new note
    res.status(202).json({ note: note });
  } catch (error) {
    console.error(error);
  }
}

// delete note
const deleteNote = async (req, res) => {
  try {
    // get id
    const noteId = req.params.id;
  
    // find and delete # tag-13
    await Note.deleteOne({ _id: noteId, user: req.user._id }); 
    // res
    res.status(202).json({ message: "deleted" });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { deleteNote, updateNote, findNote, home, createNote, fetchNotes };