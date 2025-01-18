const net = require('net');
const User = require('../models/user')
const Movie = require('../models/movie')

const sendToServer = (message) => {
    return new Promise((resolve, reject) => {
        const destIp = 'cpp_server';
        const localDestIp = '127.0.0.1'
        const destPort = 7071;

        const client = new net.Socket();

        const connectWithRetry = () => {
            client.connect(destPort, destIp, () => {
                client.write(message);
            });
        };

        client.on('connect', () => {
            client.write(message); // Send the message
        });

        client.on('data', (data) => {
            resolve(data.toString());
            client.end();
        });

        client.on('error', (err) => {
            console.error('Connection error:', err);
            // Retry after a delay
            setTimeout(connectWithRetry, 1000);
        });

        connectWithRetry(); // initial connection attempt
    });
};

const addMovieTest = async () => {
    const userId = 100;
    const movieId = 200;
    var response = await sendToServer('PATCH ' + userId + ' ' + movieId + '\n');
    if(response[0] == '4'){
         response = await sendToServer('POST ' + userId + ' ' + movieId + '\n');
    }
    return response;
}

const splitString = async (response) => {
    
    // Match everything between the second \n and the last \n
    const match = response.match(/(?<=\n\n)(.*)/);
    if (!match || !match[0].trim() || match[0].trim() === "200 Ok") {
        return []; // Return an empty array
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
        //for not empty userdata.txt
        if(currMovie)
        {
            moviesToReturn.push(currMovie);
        }
    }
    return moviesToReturn;
};

const getRecommendation = async (currUser,currMovie) => {
    try{
    const user = await User.findById(currUser);
    const movie = await Movie.findById(currMovie);
    // the user we want to recommend to or the movie we want to recommend on does not exist
    if(!user || !movie){
        return null;
    }
    const userId = user.userId;
    const movieId = movie.movieId;
    console.log("USERID: "+userId)
    console.log("MOVIEID:"+movieId)
    console.log("1")
    const response =  await sendToServer('GET ' + userId + ' ' + movieId + '\n');
    console.log("response: "+response)
    if(response[0] == '4'){
    console.log("2")

        return response;
    }
    console.log("3")
    return splitString(response);
    }
    catch
    {
        return null
    }
}
const addMovie = async (currUser,currMovie) => {
    try
    {
    const user = await User.findById(currUser);
    const movie = await Movie.findById(currMovie);
    // the user we want to recommend to or the movie we want to recommend on does not exist
    if(!user || !movie){
        return null;
    }
    const userId = user.userId;
    const movieId = movie.movieId;
    if(!user.moviesWatched.includes(movie._id))
    {
        return null
    }
    var response = await sendToServer('PATCH ' + userId + ' ' + movieId + '\n');
    if(response[0] == '4'){
        response = await sendToServer('POST ' + userId + ' ' + movieId + '\n');
    }
    return response;
    }
    catch
    {
        return null
    }
}
module.exports = {addMovie, getRecommendation , sendToServer,addMovieTest}
