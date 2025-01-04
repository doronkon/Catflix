const User = require('../models/user');


const validateHeadersUser = async (id) => {
    //currently just checking if exists
    return await User.findById(id);
}

const validateUser = async (name, password) => {
    const user = await User.findOne({name,password});
    if(!user)
    {
        const user = await User.findOne({name});
        if(user)
        {
            return {error:'Incorrect password'}
        }
        return {error:'Incorrect user Name'}
    }
    return user

};

module.exports = {validateUser,validateHeadersUser}
