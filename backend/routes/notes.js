const express = require('express');
const Note = require('../models/noteModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: "These are notes!"})
});

router.get('/:id', (req, res) => {
    res.json({message: "This is a note!"});
});

router.post('/', async(req, res) => {
    const { text } = req.body;
    try{
        const note = await Note.create({text});
        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

router.delete('/:id', (req, res) => {
    res.json({message: "Delete a note!"});
});

router.patch('/:id', (req, res) => {
    res.json({message: "Update a note!"});
})

module.exports = router;