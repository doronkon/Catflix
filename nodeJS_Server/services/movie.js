const Movie = require('../models/movie');
const Category = require('./category');
const modelCategory = require('../models/category');
const User = require('../models/user');
const cppConnector = require("./recommend");
const {write64File} = require('../Utills/utills')


const maxIdMovie = async () => {
    const maxIdMovie = await Movie.find({}).sort({ movieId: -1 }).limit(1);
    // database is still empty
    if (maxIdMovie.length === 0) {
        return 0;
    } else {
        return maxIdMovie[0].movieId;
    }
}

const createMovie = async (name , pathToMovie, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const categoryObject = await Category.getCategoryById(category);
    if (!categoryObject) {
        return null
    }

    const movie = new Movie({ name: name, pathToMovie : pathToMovie, category: category });

    const fileName = write64File(movie._id,pathToMovie,"actualMovies","mp4")
    if(fileName)
    {
        movie.pathToMovie = fileName;
    }
    else
    {
        return null;
    }

    const futureMovieId = await maxIdMovie();
    movie.movieId = futureMovieId + 1;

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

const getMovieById = async (id) => {
    try {
        return await Movie.findById(id);
    }
    catch{
        return null
    }
};

const promotedCategories = async (watchedMovies) => {
    // Fetch all categories with their movies populated
    const categories = await modelCategory.find().populate('movies');

    // Convert watchedMovies to a Set for faster lookups
    const watchedMovieIds = new Set(watchedMovies.map(movie => String(movie._id)));

    // Process each category
    const result = categories
        .filter(category => category.promoted) // Only consider promoted categories
        .map(category => {
            // Filter out watched movies
            const filteredMovies = category.movies.filter(movie =>
                !watchedMovieIds.has(String(movie._id))
            );

            // Shuffle the remaining movies
            const shuffledMovies = filteredMovies.sort(() => 0.5 - Math.random());

            // Take up to 20 movies
            const randomMovies = shuffledMovies.slice(0, 20);

            return {
                categoryName: category.name,
                movies: randomMovies
            };
        });

    return result;
};

const userMovies = async (currentUser, watchedMovies) => {
    const newCategoryName = "categoryFor-" + currentUser;

    // Assuming createCategory is an asynchronous function, await it
    const userCategory = await Category.createCategory(newCategoryName, false);

    // Loop through watchedMovies and add each movie to the new category
    const lastTwenty = watchedMovies.slice(-20); // Get the last 20 movies
    for (const movie of lastTwenty) {
        userCategory.movies.push(movie);
    }

    // Shuffle the movies
    userCategory.movies.sort(() => Math.random() - 0.5);

    // Save the category
    await userCategory.save();

    // Populate the movies field to return the movie details
    const populatedCategory = await modelCategory.findById(userCategory._id).populate('movies');

    return populatedCategory.movies; // Return the populated movies array
};

const getMovies = async (currentUser) => {
    if (!currentUser) {
        return null;
    }

    // Get the movies the current user has watched and extract their _id values
    const user = await User.findById(currentUser).populate('moviesWatched');
    const watchedMovies = user.moviesWatched.map(movie => movie._id.toString());

    // Fetch both promoted categories and user movies concurrently
    const [promotedMovies, alreadyWatched] = await Promise.all([
        promotedCategories(watchedMovies),
        userMovies(currentUser, watchedMovies)
    ]);

    // Return the results in an object
    return {
        promotedMovies,
        alreadyWatched
    };
};

const deleteFictive = async (currentUser) => {
    const newCategoryName = "categoryFor-" + currentUser;
    await modelCategory.deleteOne({ name: newCategoryName });
}

const updateMovie = async (id, name, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const updatedMovie = await getMovieById(id);
    if (!updatedMovie) {
        return null;
    }
    if (name) {
        updatedMovie.name = name;
    }
    if (category) {
        const categoryObject = await Category.getCategoryById(category);
        if (!categoryObject) {
            return null
        }
        //removing from category list the movie id
        const categoryOld = await Category.getCategoryById(updatedMovie.category);
        if (!categoryOld) {
            return null
        }
        categoryOld.movies.pull(id);
        await categoryOld.save();
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
    //getting the movie
    const deletedMovie = await getMovieById(id);
    if (!deletedMovie) {
        return null;
    }
    //deleting the movie from the category list
    const categoryObject = await Category.getCategoryById(deletedMovie.category);
    if (!categoryObject) {
        return null
    }
    categoryObject.movies.pull(id);
    await categoryObject.save();
    //find users who watched my movieid and delete me from them 
    const usersWhoWatched = await User.find({ moviesWatched: id });
    if (usersWhoWatched) {
        for (const user of usersWhoWatched) {
            user.moviesWatched.pull(id)
            await user.save()
            const deleteMessage = "DELETE " + user.userId + " " + deletedMovie.movieId;
            cppConnector.sendToServer(deleteMessage);
        }
    }
    //finally deleting the movie
    await deletedMovie.deleteOne();
    return deletedMovie;
};

const putMovie = async (id, name, category, date, actors, director, thumbnail, length, description, catflixOriginal, minimalAge) => {
    const movie = await getMovieById(id);
    if (!movie) {
        return null;
    }
    movie.name = name;

    const categoryObject = await Category.getCategoryById(category);
    if (!categoryObject) {
        return null
    }
    //removing from category list the movie id
    const categoryOld = await Category.getCategoryById(movie.category);
    if (!categoryOld) {
        return null
    }
    categoryOld.movies.pull(id);
    await categoryOld.save();
    //adding the movie to category and vise versa
    categoryObject.movies.push(id)
    movie.category = category;
    await categoryObject.save();

    if (catflixOriginal != null) {
        movie.catflixOriginal = catflixOriginal;
    } else {
        movie.catflixOriginal = false;
    }
    if (date) {
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

module.exports = { createMovie, getMovieById, updateMovie, getMovies, deleteMovie, putMovie, deleteFictive };