const tokenService = require('../services/token');

const validateUser = async (req, res) => {
    const user = await tokenService.validateUser(req.body['user'],req.body['password']);
    if (user.error)
    {
        return res.status(400).json({ errors: [user.error] });
    }
    res.json(user);
};

const validateToken = async (req, res) => {

    if(!req.headers['token'])
    {
        return res.status(400).json('No token');
    }
    const user = await tokenService.validateToken(req.headers['token']);
    if (!user)
    {
        return res.status(403).json('invalid Token');
    }
    res.json(user);
};
module.exports = {validateUser,validateToken}
