import React from 'react'
import notesStore from '../stores/notesStore';

const Note = ({ note }) => {
  const store = notesStore();
  return (
    <div>
      <div key={note._id} className='flex items-center justify-between m-4 p-2 border'>
        <div className="flex flex-col items-start" >
          <h3 className='text-3xl'>{note.title}</h3>
          <h4>{note.body}</h4>
        </div>
        {/* using deleteNote function # tag-10 */}
        <div className="flex gap-3">
          <button onClick={() => store.deleteNote(note._id)}>Delete</button>
          <button onClick={() => store.toggleUpdate(note)}>Update note</button>
        </div>
      </div>
    </div>
  )
}

export default Note