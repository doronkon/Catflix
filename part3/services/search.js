const category = require('../models/category');
const movie = require('../models/movie');
const Movie = require('../models/movie');



const insertMovies = async(currentMovies,MoviesResult) => {
    //existing ID set
    const existingIds = new Set(MoviesResult.map(movie => movie._id.toString()));

    for (const movie of currentMovies) {
        if (!existingIds.has(movie._id.toString())) {
            MoviesResult.push(movie); // Add the movie to the result array
            existingIds.add(movie._id.toString()); // Track the ID to avoid duplicates
        }
    }
}



const getSearchResult = async(query) => {
    const MoviesResult = [];
    //array of ids
    current = await searchForName(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForDirector(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForCategory(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForActors(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForThumbnail(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForLength(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    current = await searchForMinimalAge(query);
    if(current)
    {
        insertMovies(current,MoviesResult)
    }
    return MoviesResult;
}


const searchForName = async(query) => {
    // Create a case-insensitive regex pattern that matches the start of strings
    const regexPattern = new RegExp(query, 'i');
    // Search for movies where the name matches the regex pattern
    const finds = await Movie.find({ name: regexPattern });

    return finds;
}
const searchForCategory = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    try{
    return await Movie.find({ category: regexPattern });
    }
    catch{
        return null;
    }
}


const searchForDirector = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ director: regexPattern });
    return finds;
}

const searchForActors = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ actors: regexPattern });
    return finds;
}

const searchForThumbnail = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ thumbnail: regexPattern });
    return finds;
}

const searchForLength = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ length: regexPattern });
    return finds;
}

const searchForDescription = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ description: regexPattern });
    return finds;
}


const searchForMinimalAge = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ minimalAge: regexPattern });
    return finds;
}


module.exports = {searchForMinimalAge , searchForDescription,
    searchForLength,searchForActors,searchForThumbnail,searchForDirector,getSearchResult,searchForCategory,searchForName}

// const promoted = await modelCategory.find({ promoted: true }).populate('movies');