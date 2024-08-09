import React from 'react'
import notesStore from '../stores/notesStore';
import Note from './Note';

const Notes = () => {
  const store = notesStore();
  return (
    <main>
      {/*  list */}
      <div className="border-2 min-w-[1080px] bg-slate-600 p-10">
        {
          store.notes &&
          store.notes.map((note) => (
            <Note key={note._id} note={note}/>
          ))
        }
      </div>
    </main>
  )
}

export default Notes