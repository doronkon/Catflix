const net = require('net');
const User = require('../models/user');
const Movie = require('../models/movie')

const sendToServer = (message) => {
    return new Promise((resolve, reject) => {
        // Get the destination IP and port
        const destIp = '127.0.0.1';
        const destPort = 7071;

        // Create a TCP socket
        const client = new net.Socket();
        client.connect(destPort, destIp, () => {
            client.write(message); // Send the message
        });

        // Handle data from the server
        client.on('data', (data) => {
            resolve(data.toString()); // Resolve the response with the data
            client.end(); // Close the connection
        });
    });
}

const splitString = async (response) => {
    
    // Match everything between the second \n and the last \n
    const match = response.match(/(?<=\n\n)(.*)/);
    if (!match) {
        return []; // Return empty array if no match
    }
    
    const moviesString = match[0].trim();  // Get the matched string and remove any leading/trailing spaces
    
    // Split the string by spaces to get movie IDs
    const moviesArray = moviesString.split(/\s+/);
    
    // Convert each movie ID to an actual number
    const actualMovieId = moviesArray.map(movie => parseInt(movie, 10));

    const moviesToReturn = [];
    
    // Iterate through the movie IDs and fetch the corresponding movies
    for (let movieId of actualMovieId) {
        const currMovie = await Movie.findOne({ movieId: movieId });
        moviesToReturn.push(currMovie);
    }
    return moviesToReturn;
};

const getRecommendation = async (currUser,currMovie) => {
    const user = await User.findOne({_id:currUser});
    const movie = await Movie.findOne({_id:currMovie});
    // the user we want to recommend to or the movie we want to recommend on does not exist
    if(!user || !movie){
        return null;
    }
    const userId = user.userId;
    const movieId = movie.movieId;
    const response =  await sendToServer('GET ' + userId + ' ' + movieId + '\n');
    if(response[0] == '4'){
        return response;
    }
    return splitString(response);
}
const addMovie = async (currUser,currMovie) => {
    const user = await User.findOne({_id:currUser});
    const movie = await Movie.findOne({_id:currMovie});
    // the user we want to recommend to or the movie we want to recommend on does not exist
    if(!user || !movie){
        return null;
    }
    const userId = user.userId;
    const movieId = movie.movieId;
    var response = await sendToServer('PATCH ' + userId + ' ' + movieId + '\n');
    if(response[0] == '4'){
         response = await sendToServer('POST ' + userId + ' ' + movieId + '\n');
    }
    return response;
}
module.exports = {addMovie, getRecommendation , sendToServer}
