const userService = require('../services/user');
const tokenService = require('../services/token');


const createUser = async (req, res) => {
    const user = await userService.createUser(req.body.name, req.body.password, req.body.email, req.body.image);
    if(!user)
    {
        return res.status(404).json({ errors: ['User already exists'] });
    }
    res.json(user);
};

const getUsers = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const users = await userService.getUsers();
    res.json(users);
};

const getUser = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const user = await userService.getUserById(req.params.id);
    if(!user){
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(user);
};

const updateUser = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const updatedUser = await userService.updateUser(req.params.id, req.body.name, req.body.password, req.body.email, req.body.image, req.body.movie);
    if(!updatedUser){
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json(updatedUser);
};

const deleteUser = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const deletedUser = await userService.deleteUser(req.params.id);
    if(!deletedUser){
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json({ message: 'User deleted successfully', user: deletedUser});
};

const updateUserMovies = async (req,res) => {
    const updatedUser = await userService.updateUserMovies(req.params.id, req.body.movie);
    if(!updatedUser){
        return res.status(404).json({ errors: ['User not found'] });
    }
    res.json({ message: 'User movies updated successfully', user: updatedUser});
}

module.exports = {createUser, getUsers, getUser, updateUser, deleteUser,updateUserMovies }