const movie = require('../models/movie');
const Movie = require('../models/movie');
const Category = require('./category')

const createMovie = async (name, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const categoryObject = await Category.getCategoryById(category);
    if (!categoryObject)
    {
        return null
    }
    const movie = new Movie({ name : name, category : category });

    if (catflixOriginal != null) {
        movie.catflixOriginal = catflixOriginal;
    }
    if (date) {
        movie.published = date;
    }
    if (actors) {
        movie.actors = actors;
    }
    if (director) {
        movie.director = director;
    }
    if (thumbnail) {
        movie.thumbnail = thumbnail;
    }
    if (length) {
        movie.length = length;
    }
    if (description) {
        movie.description = description;
    }
    if (minimalAge) {
        movie.minimalAge = minimalAge;
    }
    await movie.save();
    categoryObject.movies.push(movie.id)
    await categoryObject.save();
    return movie;
};

const getMovieById = async(id) => {
    return await Movie.findById(id);
};

const getMovies = async() =>{
    return await Movie.find({});
};

const updateMovie = async(id,name, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const updatedMovie = await Movie.findById(id);
    if(!updatedMovie){
        return null;
    }
    if(name){
        updatedMovie.name = name;
    }
    if(category){
        const categoryObject = await Category.getCategoryById(category);
        if (!categoryObject)
        {
            return null
        }
        //removing from category list the movie id
        const categoryOld = await Category.getCategoryById(updatedMovie.category);
        if (!categoryOld)
        {
            return null
        }
        await Category.updateOne(
            { _id: categoryOld._id },
            { $pull: { movies: id } }
        );
        //adding the movie to category and vise versa
        categoryObject.movies.push(id)
        updatedMovie.category = category;
        await categoryObject.save();
    }
    if (catflixOriginal != null) {
        updatedMovie.catflixOriginal = catflixOriginal;
    }
    if (date) {
        updatedMovie.published = date;
    }
    if (actors) {
        updatedMovie.actors = actors;
    }
    if (director) {
        updatedMovie.director = director;
    }
    if (thumbnail) {
        updatedMovie.thumbnail = thumbnail;
    }
    if (length) {
        updatedMovie.length = length;
    }
    if (description) {
        updatedMovie.description = description;
    }
    if (minimalAge) {
        updatedMovie.minimalAge = minimalAge;
    }
    await updatedMovie.save();
    return updatedMovie;
};

const deleteMovie = async (id) => {
    const deletedMovie = await Movie.findById(id);
    if(!deletedMovie){
        return null;
    }
    await deletedMovie.deleteOne();
    return deletedMovie;
};

const putMovie = async (id,name, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const movie = await Movie.findById(id);
    if(!movie){
        return null;
    }
    movie.name = name;

    const categoryObject = await Category.getCategoryById(category);
    if (!categoryObject)
    {
        return null
    }
    //removing from category list the movie id
    const categoryOld = await Category.getCategoryById(movie.category);
    if (!categoryOld)
    {
        return null
    }
    await Category.updateOne(
        { _id: categoryOld._id },
        { $pull: { movies: id } }
    );
    //adding the movie to category and vise versa
    categoryObject.movies.push(id)
    movie.category = category;
    await categoryObject.save();

    if (catflixOriginal != null) {
        movie.catflixOriginal = catflixOriginal;
    } else {
        movie.catflixOriginal = false;
    }
    if(date){
        movie.published = date;
    } else {
        movie.published = null;
    }
    if (actors) {
        movie.actors = actors;
    } else {
        movie.actors = null;
    }
    if (director) {
        movie.director = director;
    } else {
        movie.director = null;
    }
    if (thumbnail) {
        movie.thumbnail = thumbnail;
    } else {
        movie.thumbnail = null;
    }
    if (length) {
        movie.length = length;
    } else {
        movie.length = null;
    }
    if (description) {
        movie.description = description;
    } else {
        movie.description = null;
    }
    if (minimalAge) {
        movie.minimalAge = minimalAge;
    } else {
        movie.minimalAge = null;
    }
    return await movie.save();
}

module.exports = { createMovie, getMovieById, updateMovie, getMovies, deleteMovie, putMovie };