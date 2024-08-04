
const home = (req, res) => {
  console.log("Starts here");
  res.status(200).send("Start server");
}

const fetchNotes = async (req, res) => {
  console.log("Notes here...");
  // find the notes # tag-9
  const notes = await Note.find();
  // res.status(201).send("Notes here...");
  res.status(201).json({ notes: notes });
}

const createNote = async (req, res) => {
  // 1 - get the sent in data from frontend to backend
  const { title, body } = req.body;
  console.log(title, body);
  // 2 - create a note # tag-10
  const newNote = await Note.create({
    title,
    body,
  });
  console.log(newNote);
  // 3 - res with new note
  res.status(201).json({
    note: newNote
  });
}

const findNote = async (req, res) => {
  // get id off the url
  const noteId = req.params.id;
  // find the note using if
  const note = await Note.findById(noteId);
  // res the note
  res.status(202).json({
    note: note
  });
}

const updateNote = async (req, res) => {
  // get id
  const noteId = req.params.id;
  const { title, body } = req.body;
  // find and update # tag-11
  const note = await Note.findByIdAndUpdate(noteId, {
    title: title,
    body: body
  }, { new: true }); // way 1 - cmd here to replace the old one

  console.log(note);

  // way 2 - find updated # tag-12
  // const updatedNote = await Note.findById(noteId);
  
  // res new note
  res.status(202).json({ note: note });
}

// delete note
const deleteNote = async (req, res) => {
  // get id
  const noteId = req.params.id;

  // find and delete # tag-13
  await Note.deleteOne({ _id: noteId }); 
  // res
  res.status(202).json({ message: "deleted" });
}

module.exports = { deleteNote, updateNote, findNote, home, createNote, fetchNotes };