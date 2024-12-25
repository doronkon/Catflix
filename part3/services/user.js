const User = require('../models/user');

const createUser = async (name, movieArray) => {
    const user = new User({name : name});
    if(movieArray) {
        user.moviesWatched = movieArray;
    }
    return await user.save();
};

const getUserById = async (id) => {return await User.findById(id);};

const getUsers = async () => {return await User.find({});};

const updateUser = async(id, name, movie) => {
    const user = await getUserById(id);
    if(!user){
        return null;
    }
    user.name = name;
    if(movie){
        if(!user.moviesWatched.includes(movie)){
            user.moviesWatched.push(movie);
        }
    }
    await user.save();
    return user;
}

const deleteUser = async(id) => {
    const user = await getUserById(id);
    if(!user){
        return null;
    }
    await user.deleteOne({_id:id});
    return user;
}

const updateUserMovies = async (id, movie) => {
    const user = await getUserById(id);
    if(!user){
        return null;
    }
    if(!user.moviesWatched.includes(movie)) {
        user.moviesWatched.push(movie);
    }
    return user;
};

module.exports = {createUser,getUserById,getUsers,updateUser,deleteUser,updateUserMovies}