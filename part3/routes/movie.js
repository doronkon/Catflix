const movieController = require('../controllers/movie');
const recommendController = require('../controllers/recommend');
const searchController = require('../controllers/search');
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

//recommend 
router.route('/:id/recommend')
    //current user
    .get(recommendController.getRecommendation)
    .post(recommendController.addMovie)

//search
router.route('/search/:query')
    //current user
    .get(searchController.search)


module.exports = router;