const express = require('express');

const mediaController = require('../controllers/mediaController');

const router = express();

const multer = require('multer');
const fs = require('fs');
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, res, callback) {
        if(!fs.existsSync('public')) {
            fs.mkdirSync('public');
        }

        if(!fs.existsSync('public/videos')) {
            fs.mkdirSync('public/videos')
        }

        callback(null, 'public/videos');
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() = file.originalname);
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        const ext = path.extname(file.originalname);

        if(ext !== '.mkv' && ext !== '.mp4') {
            return callback(new Error('Only videos are allowed'));
        }
        callback(null, true);
    }
})


// GET 
router.get('/all', mediaController.getAll);

// POST
router.post('/create', upload.fields([
    {
        name: 'videos',
        maxCount: 5
    }
]), mediaController.create);


module.exports = router;