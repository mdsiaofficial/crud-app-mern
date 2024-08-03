
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  }
}, { timestamps: true });

Note = mongoose.model('Note', noteSchema);

module.exports = Note;
