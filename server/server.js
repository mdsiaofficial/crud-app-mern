// load env var # tag-1
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
// console.log(process);
// console.log(process.env);

// import deps # tag-2
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
// const Note = require("./models/note.model.js");
const { home, fetchNotes, createNote, findNote, updateNote, deleteNote } = require("./controllers/notes.controller.js");
const { signup, login, logout, checkAuth } = require("./controllers/users.controller.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requireAuth = require("./middleware/requireAuth.js");
// create express app instance # tag-3
const app = express();
// config express # tag-4
app.use(express.json());
// cross origin request
app.use(cors({
  origin: true,
  // origin: ["https://crud-app-mern-olive.vercel.app/"],
  credentials:true,
}));
app.use(cookieParser());

// connect  to db # tag-5
connectToDb();

// middleware

// routing // # tag-6
// signup
app.post("/signup", signup);
app.post("/login", login);
app.get("/logout", logout);
app.get("/check-auth", requireAuth, checkAuth);

// home //
app.get("/", home);
// notes //
app.get("/notes", requireAuth, fetchNotes);
// create new notes //
app.post("/notes", requireAuth, createNote);
// find specific note //
app.get("/notes/:id", requireAuth, findNote);
// update
app.put(("/notes/:id"), requireAuth, updateNote);
// delete
app.delete(("/notes/:id"), requireAuth, deleteNote);

// start server # tag-7
app.listen(process.env.PORT, () => {
  console.log("Server is running...3000");
});