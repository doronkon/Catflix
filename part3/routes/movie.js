const movieController = require('../controllers/movie');
const express = require('express');
var router = express.Router();

router.route('/')
    //admin
    .post(movieController.createMovie)
    //current user
    .get(movieController.getMovies);
router.route('/:id')
    //everyone
    .get(movieController.getMovie)
    //admin
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)
    .put(movieController.putMovie);
    
module.exports = router;