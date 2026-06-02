const express = require('express');
const router = express.Router();

const {
    createNote,
    getNotes,
    getNoteBytitle,
    updateNote,
    UpdateNotestatus
} = require('../controller/notecontroller');


router.post('/', createNote);
router.get('/', getNotes);
router.get('/:title', getNoteBytitle);
router.put('/:title', updateNote);
router.patch('/:title/status', UpdateNotestatus);



module.exports = router;