const express = require('express');
var router = express.Router();
const videoPlayer = require('../controllers/videoPlayer');

router.route('/:id')
    .get(videoPlayer.playVideo)

module.exports = router;