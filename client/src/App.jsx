
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import Notes from './components/Notes';
import notesStore from './stores/notesStore';

// const notesRoute = "http://localhost:3000/notes";
function App() {
  const store = notesStore();
  const [notes, setNotes] = useState(null);

  // to replace create input field
  const [createForm, setCreateForm] = useState({
    title: "",
    body: ""
  });

  // to replace update input field
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: ""
  });


  // fetch # tag-1
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
    console.log(res);
  };

  // useEffect # tag-2
  useEffect(() => {
    store.fetchNotes();
  }, []);

  // update form - not using # tag-3
  const updateCreateFormField = (e) => {
    // console.log("form update");
    const { name, value } = e.target;
    // console.log("update: ", name, value);
    // console.log("update: ", createForm);
    setCreateForm({ ...createForm, [name]: value });
    // console.log("update: ", createForm);
  };

  // create note # tag-4
  const createNote = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(e.target.body.value);

    // const newNote = { title: e.target.title.value, body: e.target.body.value };

    // # tag-5
    // const res = await axios.post("http://localhost:3000/notes", newNote);
    const res = await axios.post("http://localhost:3000/notes", createForm);
    setNotes([...notes, res.data.note]);
    console.log(res);

    // clear state # tag-6
    setCreateForm({ title: "", body: "" });
  };

  // delete note # tag-9
  const deleteNote = async (_id) => {
    // delete note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);
    // update state
    const newNote = [...notes].filter((note) => (note._id !== _id));
    setNotes(newNote);
  };

  const handleUpdateFieldChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    // console.log(e.target.title.value);
    // console.log(e.target.body.value);
    // console.log(e.target);

    // const newNote = { title: e.target.title.value, body: e.target.body.value };
    // const res = await axios.put(`http://localhost:3000/notes/${_id}`, newNote);
    // setNotes([...notes, res.data.note]);
    // console.log(res);
    setUpdateForm({
      ...updateForm,
      [name]: value,
    })

  }

  const toggleUpdate = (note) => {
    // get current note
    // console.log(note);
    // set state on update
    setUpdateForm({
      _id: note._id,
      title: note.title,
      body: note.body,
    });
  };

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    //  send update req
    axios.put(`http://localhost:3000/notes/${updateForm._id}`, { title: title, body: body });
    // update state
    // console.log(res.data);
    const newNotes = [...notes];
    console.log(newNotes);
    const noteIndex = newNotes.findIndex((note) => (note._id === updateForm._id));
    console.log(noteIndex);
    newNotes[noteIndex] = { title: title, body: body };
    console.log(newNotes);
    setNotes(newNotes);

    // 
    setUpdateForm({
      _id: null,
      title: "",
      body: "",
    });
  };


  return (
    <>
      <h1>Hi Crud</h1>


      <div className='m-10'>
        {/* create */}
        {
          !store.updateForm._id && (
            <div className="">
              <h2 className='text-black bg-lime-400 text-2xl m-5'>Create Note</h2>
              {/* using updateCreateFormField # tag-7 */}
              <form action="" onSubmit={store.createNote} className='flex flex-col gap-2'>
                <input value={store.createForm.title} onChange={store.updateCreateFormField} type="text" name='title' placeholder='Title' className='p-5'/>
                <textarea value={store.createForm.body} onChange={store.updateCreateFormField} type="text" name='body' placeholder='Body' className='p-5'/>
                <button type='submit'>Add note</button>
              </form>

              {/* using direcly useState to create new note # tag-8 */}
              {/* <form action="" onSubmit={createNote} className='flex flex-col gap-2'>
                <input type="text" name='title' />
                <textarea name="body" id="body"></textarea>
                <button type='submit'>Add note</button>
              </form> */}

            </div>
          )
        }


      </div>

      {/* udpate */}

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


      {/* notes */}
      <div className="border-2 min-w-[1080px] bg-slate-600 p-10">
        {
          store.notes &&
          store.notes.map((note) => (
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
          ))
        }
      </div>


    </>
  )
}

export default App
