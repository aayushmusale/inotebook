import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    // usestate hook only for this component
    const [note, setNote] = useState({title:"", description:"", tag:""});
    // const handleClick = (e)=>{
    //   e.preventDefault();
    //   AddNote(note.title, note.description, note.tag);
    // }
    const handleClick =(e)=>{
      e.preventDefault();
      if(note.title.length<5 || note.description.length<5){
        props.showAlert("Title and Description must be atleast 5 characters long", "warning");
        return;
      }

      addNote(note.title, note.description, note.tag);
      setNote({title:"", description:"", tag:""})
      props.showAlert("Note added successfully", "success");
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
            <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
