const User = require('../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const validateHeadersUser = async (token) => {
    try {
        // Decode the JWT token (synchronously)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.id) {
            return null
        }
        // Log or use the decoded information
        try {
            return await User.findById(decoded.id)
        }
        catch {
            return null;
        }
    } catch (error) {

        return null
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
    return { "token": token, "admin": user.admin, "id": user._id }

};

const validateToken = async (token) => {
    try {
        // Decode the JWT token (synchronously)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.id) {
            return null
        }
        // Log or use the decoded information
        try {
             const user = await User.findById(decoded.id)
             return {"admin": user.admin, "id": user._id }
        }
        catch {
            return null;
        }
    } catch (error) {

        return null
    }


}

module.exports = { validateUser, validateHeadersUser ,validateToken}
