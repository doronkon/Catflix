const tokenService = require('../services/token');

const validateUser = async (req, res) => {
    const user = await tokenService.validateUser(req.headers['user'],req.headers['password']);
    if (user.error)
    {
        return res.status(400).json({ errors: [user.error] });
    }
    res.json(user);
};

module.exports = {validateUser}
