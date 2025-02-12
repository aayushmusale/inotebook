
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
     const authToken = localStorage.getItem("token"); // Get token from localStorage 
     console.log("authtoken : ", authToken);
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch Notes
    const GetNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch notes: ${response.status}`);
            }

            const json = await response.json();
            setNotes(json);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    // Add Note
    const addNote = async (title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,                },
                body: JSON.stringify({ title, description, tag }),
            });
            
            console.log(response);
            if (!response.ok) {
                throw new Error(`Failed to add note: ${response.status}`);
            }

            const note = await response.json();
            // issue is here
            console.log("Adding a note:")
            setNotes(notes.concat(note));
            // setNotes([...notes, note]);
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    // Delete Note
    const DeleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete note: ${response.status}`);
            }

            const newNotes = notes.filter((note) => note._id !== id);
            setNotes(newNotes);
        } catch (error) {
            console.error("Error deleting note:", error);
         }
    };

    // Edit Note
    const EditNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken,
                },
                body: JSON.stringify({ title, description, tag }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update note: ${response.status}`);
            }

            const updatedNotes = notes.map((note) =>
                note._id === id ? { ...note, title, description, tag } : note
            );

            setNotes(updatedNotes);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };
    
    return (
        <noteContext.Provider value={{ notes, addNote, DeleteNote, EditNote, GetNotes }}>
            {props.children}
        </noteContext.Provider>
    );
};

export default NoteState;
