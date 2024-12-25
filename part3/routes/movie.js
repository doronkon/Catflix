const movieController = require('../controllers/movie');
const express = require('express');
var router = express.Router();

router.route('/')
    .post(movieController.createMovie)
    // should work on .get
    .get(movieController.getMovies);
router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)
    .put(movieController.putMovie);
    
module.exports = router;