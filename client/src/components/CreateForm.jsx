import React from 'react'
import notesStore from '../stores/notesStore';

const CreateForm = () => {
  const store = notesStore();
  return (
    <div>
      {
        !store.updateForm._id && (
          <div className="m-10">
            <h2 className='text-black bg-lime-400 text-2xl m-5'>Create Note</h2>
            {/* using updateCreateFormField # tag-7 */}
            <form action="" onSubmit={store.createNote} className='flex flex-col gap-2'>
              <input value={store.createForm.title} onChange={store.updateCreateFormField} type="text" name='title' placeholder='Title' className='p-5' />
              <textarea value={store.createForm.body} onChange={store.updateCreateFormField} type="text" name='body' placeholder='Body' className='p-5' />
              <button type='submit'>Add note</button>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default CreateForm