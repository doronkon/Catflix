const User = require('../models/user');
const Movie = require('./movie')
const {write64File} = require('../Utills/utills')

const findMaxId = async() =>{
    const maxIdUser = await User.find({}).sort({userId: -1}).limit(1);
    // database is still empty
    if(maxIdUser.length === 0){
        return 0;
    } else {
        return maxIdUser[0].userId;
    }
}

const verifyPassword = (password) =>{
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

const createUser = async (name, displayName, password, email, image, admin) => {
    const existing = await getUserByName(name);
    if (existing)
    {
        return null
    }
    if(!verifyPassword(password)){
        return null;
    }
    const user = new User({name : name, password : password, displayName : displayName, admin : admin});
    if(email) {
        user.email = email;
    }
    if(image) {
        const fileName = write64File(user._id,image,"userLogos","png")
        if(fileName)
        {
            user.image = fileName;
        }
        else
        {
            return null;
        }

    } else if(!image) {
        const randomNum = Math.floor(Math.random() * 6) + 1;
        const pathToImage = "../public/userLogos/userlogo" + randomNum + ".png";
        user.image = pathToImage;
    }
    const futureId = await findMaxId();
    user.userId = futureId + 1;
    return await user.save();
};

const getUserByName = async (name) => {return await User.findOne({name});};


const getUserById = async (id) => {
    try{
        return await User.findById(id);
    }
    catch{
        return null
    }
};

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