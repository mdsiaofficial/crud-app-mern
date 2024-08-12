import axios from 'axios';
import { create } from 'zustand';


const notesStore = create((set) => ({
  notes: null,

  createForm: {
    title: "",
    body: "",
  },

  updateForm: {
    _id: null,
    title: "",
    body: "",
  },

  // 
  fetchNotes: async () => {
    const res = await axios.get("/notes")
    set({
      notes: res.data.notes,
    });
  },

  // 
  updateCreateFormField: (e) => {
    // console.log("form update");
    const { name, value } = e.target;
    set((state) => ({
      createForm: {
        ...state.createForm,
        [name]: value,
      }
    }));
    // console.log("update: ", createForm);
  },
  
  // 
  createNote: async (e) => {
    e.preventDefault();
    const { createForm, notes } = notesStore.getState();

    const res = await axios.post("/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
      }
    });
    console.log(res);
  },
  // 
  deleteNote: async (_id) => {
    const { notes } = notesStore.getState();
    // delete note
    const res = await axios.delete(`/notes/${_id}`);
    // update state
    const newNote = notes.filter((note) => (note._id !== _id));
    set({
      notes: newNote
    });

  },
  // 
  handleUpdateFieldChange: async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      }
    }));

  },
  // 
  toggleUpdate: (note) => {
    // get current note
    // console.log(note);
    // set state on update
    set({
      updateForm: {
        _id: note._id,
        title: note.title,
        body: note.body,
      },
    });
  },
  // 
  updateNote: async (e) => {
    e.preventDefault();
    const { updateForm, notes } = notesStore.getState();
    const { title, body, _id } = updateForm;

    //  send update req
    axios.put(`/notes/${_id}`, { title: title, body: body });
    // update state
    // console.log(res.data);
    const newNotes = [...notes];
    // console.log(newNotes);
    const noteIndex = newNotes.findIndex((note) => (note._id === _id));
    console.log(noteIndex);
    newNotes[noteIndex] = { title: title, body: body };
    // console.log(newNotes);
    set({
      notes: newNotes,
      updateForm: {
        _id: null,
        title: "",
        body: "",
      },
    });
  }

}));
export default notesStore;