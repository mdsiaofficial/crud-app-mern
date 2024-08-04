
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: ""
  });


  // fetch 
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    setNotes(res.data.notes);
    console.log(res);
  };

  // useEffect
  useEffect(() => {
    fetchNotes();
  }, []);

  // update form - not using
  const updateCreateFormField = (e) => {
    console.log("form update");
    const { name, value } = e.target;
    console.log("update: ", name, value);
    console.log("update: ", createForm);
    setCreateForm({ ...createForm, [name]: value });
    console.log("update: ", createForm);
  };

  // create note
  const createNote = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(e.target.body.value);
    
    const newNote = { title: e.target.title.value, body: e.target.body.value };
    // const res = await axios.post("http://localhost:3000/notes", createForm);
    const res = await axios.post("http://localhost:3000/notes", newNote);
    setNotes([...notes, res.data.note]);
    console.log(res);

    // clear state
    // setCreateForm({ title: "", body: "" });

  }

  return (
    <>
      <h1>Hi Crud</h1>
      <div className="border-2 bg-slate-600 p-10">
        {
          notes &&
          notes.map((note) => (
            <div key={note._id} className='flex items-center justify-between m-4 p-2 border'>
              <div className="flex flex-col items-start" >
                <h3 className='text-3xl'>{note.title}</h3>
                <h4>{note.body}</h4>
              </div>
              <button>Delete</button>
            </div>
          ))
        }
      </div>


      <div className='m-10'>
        <h2>Create Note</h2>

        {/* <form action="" onSubmit={createNote} className='flex flex-col gap-2'>
          <input onChange={updateCreateFormField} type="text" name='title' />
          <input onChange={updateCreateFormField} value={createForm.body} type="text" name='body' />
          <button type='submit'>Add note</button>
        </form> */}

        <form action="" onSubmit={createNote} className='flex flex-col gap-2'>
          <input type="text" name='title' />
          <input type="text" name='body' />
          <button type='submit'>Add note</button>
        </form>
      </div>
    </>
  )
}

export default App
