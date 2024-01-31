const Folder = require('../models/folderModel');
const Note = require('../models/noteModel');
const mongoose = require('mongoose');

//get all folder
const getFolders = async (req, res) => {
    const folder = await Folder.find({}).sort({createdAt: -1});
    res.status(200).json(folder);
}

//get a single folder
const getFolder = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such folder!"});
    }

    const folder = await Folder.findById(id);

    if(!folder){
        return res.status(404).json({error: "No such folder!"});
    }

    const notes = await Note.find({}).where({folder: id});

    res.status(200).json(notes);
}

//create new folder
const createFolder = async (req, res) => {
    const { text } = req.body;
    try{
        const folder = await Folder.create({text});
        res.status(200).json(folder);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a folder
const deleteFolder = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such folder!"});
    }

    const folder = await Folder.findOneAndDelete({_id: id});

    if(!folder){
        return res.status(400).json({error: "No such folder!"});
    }

    res.status(200).json(folder);
}

//update a folder
const updateFolder = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such folder!"});
    }

    const folder = await Folder.findOneAndUpdate({_id: id}, {...req.body});

    if(!folder){
        return res.status(400).json({error: "No such folder!"});
    }

    res.status(200).json(folder);
}


//export
module.exports = {
    createFolder,
    getFolders,
    getFolder,
    deleteFolder,
    updateFolder,
}