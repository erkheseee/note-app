const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model('Folder', folderSchema);