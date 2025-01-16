const tokenService = require('../services/token');

const validateUser = async (req, res) => {
    const user = await tokenService.validateUser(req.body['user'],req.body['password']);
    if (user.error)
    {
        return res.status(400).json({ errors: [user.error] });
    }
    res.json(user);
};

module.exports = {validateUser}
