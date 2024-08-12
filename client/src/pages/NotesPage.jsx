import React, { useEffect } from 'react'
import notesStore from '../stores/notesStore';
import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import Notes from '../components/Notes';

const NotesPage = () => {

  const store = notesStore();
  // useEffect # tag-2
  useEffect(() => {
    store.fetchNotes();
  }, [store]);


  return (
    <div>
      {/* create */}
      <CreateForm />
      {/* udpate */}
      <UpdateForm />
      {/* notes */}
      <Notes />
    </div>
  )
}

export default NotesPage