
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

// Create a model for our notes collection # tag-8
module.exports = Note = mongoose.model('Note', noteSchema);;
