const Media = require('../Models/Media');

exports.getAll = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch(err) {
        req.status(400).json({message: 'No videos found'})
    }
}

exports.create = async (req, res) => {
    const {name} = req.body;
    let videoPaths = [];

    if(Array.isArray(req.files.videos) && req.file.videos.length > 0) {
        for(let video of req.files.videos) {
            videoPaths.push("/" + video.path);
        }
    }

    try {
        const createMedia = await Media.create({
            name,
            videos: videoPaths
        })
        res.json({message: 'Media created successfully', createMedia})
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
}