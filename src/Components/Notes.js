import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
// import EditNote from './EditNote';
const Notes = (props) => {
    let navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, GetNotes, EditNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        if(localStorage.getItem('token')){
            GetNotes()
        }
        else
        {
            navigate("/login");
        }
        
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleClick = (e) => {
        console.log("Updating the note...", note);
        EditNote(note.id, note.etitle, note.edescription, note.etag);
        if (refClose.current) {
            refClose.current.click();
        }        // addNote(note.title, note.description, note.tag);
        props.showAlert("Note updated Successfully", "success");
    }
    const onChange = (e) => {
        // 
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const {showAlert} = props;
    return (
        <div className='container my-5'>
            <AddNote showAlert={showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Description</label>
                                    <input type="text" value={note.edescription} className="form-control" id="edescription" name='edescription' onChange={onChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="desc" className="form-label">Tag</label>
                                    <input type="text" value={note.etag} className="form-control" id="etag" name='etag' onChange={onChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} data-bs-dismiss="modal" className="btn btn-primary">Update note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-4">
                <h3>Your Notes</h3>
                {/* <div className="container mx-1"> */}
                {notes && notes.length > 0 ? (
                    notes.map((note) => {
                        return <NoteItem key={note._id} updateNote={updateNote} particularnote={note} showAlert={showAlert} />
                    })
                ) : (
                    <p>No notes available</p>
                    
                )}
                {/* </div> */}
            </div>
        </div>
    );
};

export default Notes;
