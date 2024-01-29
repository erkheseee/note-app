const express = require('express');
const { 
    createFolder,
    getFolder,
    getFolders,
    deleteFolder,
    updateFolder,
} = require('../controller/folderController');

const router = express.Router();

router.get('/', getFolders);
router.get('/:id', getFolder);
router.post('/', createFolder);
router.delete('/:id', deleteFolder);
router.patch('/:id', updateFolder);

module.exports = router;