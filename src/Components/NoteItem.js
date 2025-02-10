import React, {useContext} from 'react';
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const {DeleteNote} = context;
    
    const { particularnote, updateNote } = props;
    
    // Debug log for particularnote
    console.log("Particular note:", particularnote);

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">

                    <h5 className="card-title">{particularnote.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{particularnote.tag}</h6>
                    <p className="card-text">{particularnote.description}</p>
                    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{DeleteNote(particularnote._id); props.showAlert("Note Deleted Successfully", "info")}}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(particularnote)}}></i>
                    
                    </div>
            </div>
        </div>
    );
};

export default NoteItem;
