
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  }
}, { timestamps: true });

// Create a model for our notes collection # tag-8
module.exports = Note = mongoose.model('Note', noteSchema);;
