const User = require('../models/user');
const jwt = require('jsonwebtoken');


const validateHeadersUser = async (id) => {
    //currently just checking if exists
    try {
        return await User.findById(id)
    }
    catch {
        return null;
    }
}

const validateUser = async (name, password) => {
    const user = await User.findOne({ name, password });
    if (!user) {
        const user = await User.findOne({ name });
        if (user) {
            return { error: 'Incorrect password' }
        }
        return { error: 'Incorrect user Name' }
    }
    // Generate JWT Token using the secret key from environment variables
    const token = jwt.sign(
        { id: user._id }, // Payload: user ID
        process.env.SECRET_KEY, // Secret key from environment variable
        { expiresIn: '1h' } // Token expiration time (optional)
    );
    return {"token":token,"admin":user.admin}

};

module.exports = { validateUser, validateHeadersUser }
