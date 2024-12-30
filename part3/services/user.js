const User = require('../models/user');
const Movie = require('./movie')

const findMaxId = async() =>{
    const maxIdUser = await User.find({}).sort({userId: -1}).limit(1);
    // database is still empty
    if(maxIdUser.length === 0){
        return 0;
    } else {
        return maxIdUser[0].userId;
    }
}

const createUser = async (name, password, email, image) => {
    const user = new User({name : name, password : password});
    if(email) {
        user.email = email;
    }
    if(image) {
        user.image = image;
    }
    const futureId = await findMaxId();
    user.userId = futureId + 1;
    return await user.save();
};

const getUserById = async (id) => {return await User.findById(id);};

const getUsers = async () => {return await User.find({});};

const updateUser = async(id, name, password, email, image, movie) => {
    const user = await getUserById(id);
    if(!user){
        return null;
    }
    if(name){
        user.name = name;
    }
    if(password){
        user.password = password;
    }
    if(email){
        user.email = email;
    }
    if(image){
        user.image = image;
    }
    if(movie && !user.moviesWatched.includes(movie)) {
        //making sure the movie is in the data base
        const movieObject = await Movie.getMovieById(movie);
        if (!movieObject)
        {
            return null
        }
        user.moviesWatched.push(movie);
    }
    await user.save();
    return user;
}

const deleteUser = async(id) => {
    const user = await getUserById(id);
    if(!user){
        return null;
    }
    await user.deleteOne();
    return user;
}

module.exports = {createUser, getUserById, getUsers, updateUser, deleteUser}