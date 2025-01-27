const movieService = require('../services/movie');
const tokenService = require('../services/token');


const createMovie = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    if (!req.body.name || !req.body.category)
    {
        return res.status(400).json({ errors: ['Bad request no name or category'] });
    }
    const movie = await movieService.createMovie( req.body.name, req.body.pathToMovie, req.body.category, req.body.date, req.body.actors, req.body.director, req.body.thumbnail, req.body.length, req.body.description, req.body.catflixOriginal, req.body.minimalAge);
    if (!movie)
    {
        return res.status(404).json({ errors: ['Category not found'] });
    }
    return res.status(201).json(movie);
};

const getMovies = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const movies = await movieService.getMovies(headersUser._id);
    if(!movies){
        // No movies for user
        return res.status(404).json({ errors: ['Movie not found'] });
    }
    res.json(movies);
    // add deletion of fictive category
    await movieService.deleteFictive(headersUser._id);
};

const getMovie = async (req, res) => {
    const movie = await movieService.getMovieById(req.params.id);
    if (!movie) {
        return res.status(404).json({ errors: ['Movie not found or invalid ID'] });
    }
    res.json(movie);
};

const updateMovie = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const updatedMovie = await movieService.updateMovie(req.params.id, req.body.name, req.body.pathToMovie, req.body.category, req.body.date, req.body.actors, req.body.director, req.body.thumbnail, req.body.length, req.body.description, req.body.catflixOriginal, req.body.minimalAge);
    if (!updatedMovie) {
        return res.status(404).json({ errors: ['Movie not found or invalid ID'] });
    }
    res.json(updatedMovie);
};

const deleteMovie = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const deletedMovie = await movieService.deleteMovie(req.params.id);
    if (!deletedMovie) {
        return res.status(404).json({ errors: ['Movie not found or invalid ID'] });
    }
    res.json(deletedMovie);
};

const putMovie = async(req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    if(!req.body.name)
    {
        return res.status(400).json({ errors: ['Bad request no name'] });
    }
    const movie = await movieService.putMovie(req.params.id, req.body.name, req.body.category, req.body.date, req.body.actors, req.body.director, req.body.thumbnail, req.body.length, req.body.description, req.body.catflixOriginal, req.body.minimalAge);
    if (!movie) {
        return res.status(404).json({ errors: ['Movie not found or invalid ID or Category not found'] });
    }
    res.json(movie);
}
const index = async(req, res) => {
    const allMovies = await movieService.index();
    if(!allMovies){
        return res.status(404).json({ errors: ['server failed'] });
    }
    res.json(allMovies);
};

module.exports = { createMovie, getMovies, getMovie, updateMovie, deleteMovie, putMovie,index };