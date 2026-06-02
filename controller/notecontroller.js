const Note = require('../model/note');

const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;

        let Ntitle = title.trim();
        let Ncontent = content.trim();

        if(!Ntitle && !Ncontent){
            return res.status(400).json({message: 'Title and content are required'})
        }

        const newNote = new Note({
            title : Ntitle || 'Untitled Note',
            content : Ncontent || 'No content'
        })

        await newNote.save();

        res.status(201).json(newNote);

    }catch (err){
        res.status(500).json({message: err.message})
        console.error(`Error creating note: ${err.message}`);
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error fetching notes: ${err.message}`);
    }
};

const getNoteBytitle = async (req, res) => {
    try {
        const note = await Note.findOne({ title: req.params.title });
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
            { title: req.params.title },
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
            req.params.title, 
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
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error fetching notes by status: ${err.message}`);
    }
};

const TDeleteNote = async (req, res) => {
    try {
        const { status } = req.body;
        const note = await Note.findOneAndUpdate(
            req.params.title, 
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

module.exports = {
    createNote,
    getNotes,
    getNoteBytitle,
    updateNote,
    ArchiveNote,
    TDeleteNote,
    getNotebystatus
}