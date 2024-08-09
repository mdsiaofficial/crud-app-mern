
import React from 'react'
import notesStore from '../stores/notesStore';

const UpdateForm = () => {
  const store = notesStore();
  return (
    <div>
      {
        store.updateForm._id && (
          <div className="m-10">
            <h2 className='text-black bg-red-400 text-2xl m-5'>Update note</h2>
            <form action="" onSubmit={store.updateNote} className='flex flex-col gap-2'>
              <input value={store.updateForm.title} onChange={store.handleUpdateFieldChange} type="text" name='title' className='p-5' />
              <textarea value={store.updateForm.body} onChange={store.handleUpdateFieldChange} name="body" id="body" className='p-5'/>
              <button type='submit'>Update note</button>
            </form>
          </div>
        )
      }

    </div>
  )
}

export default UpdateForm;