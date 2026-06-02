const mongoose = require('mongoose');

const noteschema = new mongoose.Schema({
    
    title: {
        type: String,
    },
    content: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'deleted'],
        default: 'active',
    },
    createAt: {
        type: Date,
    },
    updateAt: {
        type: Date,
    },
    deletedAt: {
        type: Date,
    }
},{
    timestamps: true
})


module.exports = mongoose.model('Note', noteschema);