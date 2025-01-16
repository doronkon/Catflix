const express = require('express');
var router = express.Router();
const videoPlayer = require('../services/videoPlayer');

router.route('/:id')
    .get(videoPlayer.playVideo)

module.exports = router;