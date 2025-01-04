const category = require('../models/category');
const Movie = require('../models/movie');
const { all } = require('../routes/user');

const getSearchResult = async(query) => {
    const searchFields = ['Name', 'category', 'published', 'director', 'actors', 'thumbnail', 'length', 'description', 'catflixOriginal', 'minimalAge'];
    const searchResult = [];
    let i = 0;

    searchFields.forEach(field => {
        const funcName = 'searchFor' + field;
        if (typeof global[funcName] === 'function') {
            const val = null;
            val = global[funcName](query);
            if (val != null) {
                searchResult[i] = val;
                i++;
            }
        } else {
            console.log("ShE Is A WOmAn AnD He hAs BRiStLEs")
        }
    });

    return searchResult;
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
    
    const finds = await Movie.find({ category: regexPattern });
    return finds;
}

const searchForPublished = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ published: regexPattern });
    return finds;
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

const searchForCatflixOriginal = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ catflixOriginal: regexPattern });
    return finds;
}

const searchForMinimalAge = async(query) => {
    const regexPattern = new RegExp(query, 'i');
    
    const finds = await Movie.find({ minimalAge: regexPattern });
    return finds;
}


module.exports = {searchForMinimalAge, searchForCatflixOriginal , searchForDescription,
    searchForLength,searchForActors,searchForThumbnail,searchForDirector,getSearchResult,searchForPublished,searchForCategory,searchForName}

// const promoted = await modelCategory.find({ promoted: true }).populate('movies');