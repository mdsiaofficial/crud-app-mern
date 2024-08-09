
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Notes from './components/Notes';
import notesStore from './stores/notesStore';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';

// const notesRoute = "http://localhost:3000/notes";
function App() {
  const store = notesStore();
  // useEffect # tag-2
  useEffect(() => {
    store.fetchNotes();
  }, [store]);




  return (
    <>
      <h1>Hi Crud</h1>

      {/* create */}
      <CreateForm />

      {/* udpate */}
      <UpdateForm />

      {/* notes */}
      <Notes />
    </>
  )
}

export default App
