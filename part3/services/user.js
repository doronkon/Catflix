const User = require('../models/user');

const createUser = async (name, password, email, image) => {
    const user = new User({name : name, password : password});
    if(email) {
        user.email = email;
    }
    if(image) {
        user.image = image;
    }
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

module.exports = {createUser, getUserById, getUsers, updateUser, deleteUser, updateUserMovies}