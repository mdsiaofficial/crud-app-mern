
import { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'

const notesRoute = "http://localhost:3000/notes";
function App() {
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
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
    fetchNotes();
  }, []);

  // update form - not using # tag-3
  const updateCreateFormField = (e) => {
    console.log("form update");
    const { name, value } = e.target;
    console.log("update: ", name, value);
    console.log("update: ", createForm);
    setCreateForm({ ...createForm, [name]: value });
    console.log("update: ", createForm);
  };

  // create note # tag-4
  const createNote = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    // console.log(e.target.body.value);
    
    const newNote = { title: e.target.title.value, body: e.target.body.value };

    // # tag-5
    // const res = await axios.post("http://localhost:3000/notes", createForm);
    const res = await axios.post("http://localhost:3000/notes", newNote);
    setNotes([...notes, res.data.note]);
    console.log(res);

    // clear state # tag-6
    // setCreateForm({ title: "", body: "" });

  }

  // delete note # tag-9
  const deleteNote = async (_id) => {
    // delete note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);
    // update state
    const newNote = [...notes].filter((note) => (note._id !== _id));
    setNotes(newNote);
  }

  return (
    <>
      <h1>Hi Crud</h1>
      <div className='m-10'>
        <h2>Create Note</h2>
        {/* using updateCreateFormField # tag-7 */} 
        {/* <form action="" onSubmit={createNote} className='flex flex-col gap-2'>
          <input onChange={updateCreateFormField} type="text" name='title' />
          <input onChange={updateCreateFormField} value={createForm.body} type="text" name='body' />
          <button type='submit'>Add note</button>
        </form> */}

        {/* using direcly useState to create new note # tag-8 */}
        <form action="" onSubmit={createNote} className='flex flex-col gap-2'>
          <input type="text" name='title' />
          {/* <input type="text" name='body' /> */}
          <textarea name="body" id="body"></textarea>
          <button type='submit'>Add note</button> 
        </form>
      </div>

      {/*  */}
      <div className="border-2 bg-slate-600 p-10">
        {
          notes &&
          notes.map((note) => (
            <div key={note._id} className='flex items-center justify-between m-4 p-2 border'>
              <div className="flex flex-col items-start" >
                <h3 className='text-3xl'>{note.title}</h3>
                <h4>{note.body}</h4>
              </div>
              {/* using deleteNote function # tag-10 */}
              <button onClick={() => deleteNote(note._id)}>Delete</button>
            </div>
          ))
        }
      </div>


      
    </>
  )
}

export default App
