const express = require('express');
const router = express.Router();

const {
    createNote,
    getNotes,
    getNoteBytitle,
    updateNote,
    ArchiveNote,
    TemporalDeleteNote,
    getNotebystatus,
    permanentlyDeleteNote
} = require('../controller/notecontroller');


router.post('/', createNote);
router.get('/', getNotes);
router.get('/:title', getNoteBytitle);
router.put('/:title', updateNote);
router.patch('/:title/status', getNotebystatus);
router.patch('/:title/archive', ArchiveNote);
router.patch('/:title/delete', TemporalDeleteNote); 
router.delete('/:title', permanentlyDeleteNote);   



module.exports = router;