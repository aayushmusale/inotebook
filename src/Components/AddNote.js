import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    // usestate hook only for this component
    const [note, setNote] = useState({title:"", description:"", tag:"default"});
    // const handleClick = (e)=>{
    //   e.preventDefault();
    //   AddNote(note.title, note.description, note.tag);
    // }
    const handleClick =(e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
    }
    const onChange = (e)=>{
      // 
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='desc' onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
