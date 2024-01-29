const express = require('express');
const { 
    createNote,
    getNote,
    getNotes,
    deleteNote,
    updateNote,
} = require('../controller/noteController');

const router = express.Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);

module.exports = router;