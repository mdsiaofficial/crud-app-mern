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
  fetchNotes: async () => {
    const res = await axios.get("http://localhost:3000/notes")
    set({
      notes: res.data.notes,
    });
  },
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
  createNote: async (e) => {
    e.preventDefault();
    const { createForm, notes } = notesStore.getState();

    const res = await axios.post("http://localhost:3000/notes", createForm);

    set({
      notes: [...notes, res.data.note],
      createForm: {
        title: "",
        body: "",
      }
    });
    console.log(res);
  },
  deleteNote: async (_id) => {
    const { notes } = notesStore.getState();
    // delete note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    // update state
    const newNote = notes.filter((note) => (note._id !== _id));
    set({
      notes: newNote
    });

  },
  handleUpdateFieldChange: async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    set((state) => ({
      updateForm: {
        ...state.updateForm,
        [name]: value,
      }
    }));

  }


}));
export default notesStore