const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1: Fetch user's all notes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
})

//ROUTE 2: Add a new Note using: POST "localhost:5000/api/notes/addnote". Login required
router.post('/addnote', fetchuser,
    [
        // body('title'),
        // body('description'),
        // body('tag')

        body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.').notEmpty(),
        body('description').isLength({ min: 5 }).withMessage('Description must be at least 10 characters long.').notEmpty(),
        body('tag').optional().isLength({ min: 3 }).withMessage('Tag must be at least 3 characters long.')


    ]
    , async (req, res) => {

        try {
            const { title, description } = req.body;
            const errors = validationResult(req);

            // If there are errors, return Bad request and the errors
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title,
                description,
                user: req.user.id,
            })

            const savedNote = await note.save();
            res.json(savedNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }

    })


//ROUTE 3: Update Note using: PUT "localhost:5000/api/notes/updatenotes/:id". Login required
router.put('/updatenotes/:id', fetchuser, async (req, res) => {

    // validation of user 
    // destructuring the note
    // check presence of note
    // update and return

    const { title, description, tag } = req.body;

    // Create a newNote object
    const newNote = {};

    if (title) {
        newNote.title = title;
    }
    if (description) {
        newNote.description = description;
    }
    if (tag) {
        newNote.tag = tag;
    }

    // check if the note is present or not
    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Note Not Found!!");
    }

    // check if the user is the owner of the note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });

})





//ROUTE 4: Deleting the Note using: DELETE "localhost:5000/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    // req.id 
    // find the note by id
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note Not Found!!");
        }

        // check if the user is the owner of the note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.deleteOne({ _id: req.params.id });
        res.json({ "Note Deleted Successfully": note })
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }

    // if note not found
    // if user is not authorized
    // delete the note

})

module.exports = router;    // exporting the router to use in index.js