const Note = require('../model/note');
const Counter = require('../model/counter');

const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;

        let Ntitle = title.trim();
        let Ncontent = content.trim();

        if(!Ntitle && !Ncontent){
            return res.status(400).json({message: 'Title and content are required'})
        }

        // Atomically increment and get the next ID
        const counter = await Counter.findOneAndUpdate(
            { _id: 'noteId' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const newNote = new Note({
            id: counter.seq,
            title: Ntitle || 'Untitled Note',
            content: Ncontent || 'No content'
        });

        await newNote.save();

        res.status(201).json(newNote);

    }catch (err){
        res.status(500).json({message: err.message})
        console.error(`Error creating note: ${err.message}`);
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort(`desc`);
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error fetching notes: ${err.message}`);
    }
};

const getNoteBytitle = async (req, res) => {
    try {
        const note = await Note.findOne({ id: req.params.id });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error fetching note: ${err.message}`);
    }
};

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        let Ntitle = title.trim();
        let Ncontent = content.trim();

        const note = await Note.findOneAndUpdate(
            { id: req.params.id },
            { 
                title: Ntitle || 'Untitled Note', 
                content: Ncontent || 'No content'

            },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error updating note: ${err.message}`);
    }
};

const ArchiveNote = async (req, res) => {
    try {
        const { status } = req.body;
        const note = await Note.findOneAndUpdate(
            req.params.id, 
            { status : 'archived', 
            updateAt: new Date() }, 
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error updating note status to archived: ${err.message}`);
    }
};

const getNotebystatus = async (req, res) => {
    try {
        const { status } = req.params;
        const notes = await Note.find({ status });
        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found with the specified status' });
        }
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error fetching notes by status: ${err.message}`);
    }
};

const TemporalDeleteNote = async (req, res) => {
    try {
        const { status } = req.body;
        const note = await Note.findOneAndUpdate(
            { id: req.params.id },
            { status : 'deleted', 
            updateAt: new Date() }, 
            { new: true }
        );

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error updating note status to deleted: ${err.message}`);
    }
};
const permanentlyDeleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ id: req.params.id, status: 'deleted' });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note permanently deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error  deleting note permanently: ${err.message}`);
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteBytitle,
    updateNote,
    ArchiveNote,
    TemporalDeleteNote,
    getNotebystatus,
    permanentlyDeleteNote
}