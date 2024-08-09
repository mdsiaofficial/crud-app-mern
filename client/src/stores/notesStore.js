import axios from 'axios';
import { create } from 'zustand';


const notesStore = create((set) => ({
  notes: null,
  fetchNotes: async () => {
    const res = await axios.get("http://localhost:3000/notes")
    set({
      notes: res.data.notes,
    });
  },


}));
export default notesStore