
import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    
    const notesInitial = [];
    const [notes, setNotes] = useState(notesInitial);

    // Fetch Notes
    const GetNotes = async () => {
        try {
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNDFhMDFhYzRmYTA3MTc5ZTYwYTJjIn0sImlhdCI6MTczODgwNzgwOX0.HuRC3P-XWl-k05T0mayEr9v-Oh_5s_JdbE1AWDNRzfo"
                },
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNDFhMDFhYzRmYTA3MTc5ZTYwYTJjIn0sImlhdCI6MTczODgwNzgwOX0.HuRC3P-XWl-k05T0mayEr9v-Oh_5s_JdbE1AWDNRzfo"
                },
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNDFhMDFhYzRmYTA3MTc5ZTYwYTJjIn0sImlhdCI6MTczODgwNzgwOX0.HuRC3P-XWl-k05T0mayEr9v-Oh_5s_JdbE1AWDNRzfo",
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
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhNDFhMDFhYzRmYTA3MTc5ZTYwYTJjIn0sImlhdCI6MTczODgwNzgwOX0.HuRC3P-XWl-k05T0mayEr9v-Oh_5s_JdbE1AWDNRzfo",
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








// import { useState } from "react";
// import noteContext from "./noteContext";

// const NoteState = (props) => {
//     const host = "http://localhost:5000";
//     const notesInitial = []

//     const [notes, setNotes] = useState(notesInitial);

//     //   Get notes
//     const GetNotes = async () => {
//         // TODO: API Call
//         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4N2JjZDJjZmE2MDFlMzczMjM4MDVkIn0sImlhdCI6MTczNjk0ODk0Nn0.Ojc5KNRRNlSxOHR-juuqVMeaEy7LXI1ZvDOlSGVR1DQ"
//             }
//         })  
//         const json = await response.json();
//         console.log(json);
//         setNotes(json);
//     }

//     //   Add a note
//     const AddNote = async (title, description, tag) => {
//         // TODO: API Call
//         const response = await fetch(`${host}/api/notes/addnote`, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4N2JjZDJjZmE2MDFlMzczMjM4MDVkIn0sImlhdCI6MTczNjk0ODk0Nn0.Ojc5KNRRNlSxOHR-juuqVMeaEy7LXI1ZvDOlSGVR1DQ"
//             },
//             body: JSON.stringify({ title, description, tag })
//         })
        
//         const note = await response.json();
//         console.log("Adding a note", title, description, tag);
//         setNotes(notes.concat(note));
//         // concat() returns an array while push() updates an array
//     }

//     //  Delete a note
//     const DeleteNote = async(id) => {
//         // TODO : API CALL
//         console.log("deleting the note with id" + id);
//         const newNotes = notes.filter((note) => { return note._id !== id })
//         setNotes(newNotes);
//     }



//     // Edit a note
//     const EditNote = async (id, title, description, tag) => {
//         // API CALL
//         const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
//             method: "PUT",
//             headers: {
//                 'Content-Type': 'application/json',
//                 'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc4N2JjZDJjZmE2MDFlMzczMjM4MDVkIn0sImlhdCI6MTczNjk0ODk0Nn0.Ojc5KNRRNlSxOHR-juuqVMeaEy7LXI1ZvDOlSGVR1DQ"
//             },
//             body: JSON.stringify({ title, description, tag })
//         })
//         const json = await response.json();

//         // Logic to edit in client
//         for (let index = 0; index < notes.length; index++) {
//             const element = notes[index];
//             if (element._id === id) {
//                 element._id = id;
//                 element.title = title;
//                 element.description = description;
//                 element.tag = tag;
//             }
//         }
//     }


//     return (
//         <noteContext.Provider value={{ notes, AddNote, DeleteNote, EditNote, GetNotes }}>
//             {props.children}
//             {/* error while providing object, suggested to use array instead */}
//         </noteContext.Provider>
//     )
// };


// export default NoteState;