const recommendService = require('../services/recommend');
const tokenService = require('../services/token');

const TestCPP = async (req, res) => {
    const response = await recommendService.addMovieTest()
    res.status(parseInt(response.slice(0, 3))).json();
}

const getRecommendation = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const UserID = req.headers['user']
    const MovieID = req.params.id
    if (!UserID || !MovieID) {
        // no such user
        return res.status(400).json({ errors: ['Bad request'] });
    }
    const response = await recommendService.getRecommendation(UserID,MovieID)
    res.json(response)
}
const addMovie = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const UserID = req.headers['user']
    const MovieID = req.params.id
    if (!UserID || !MovieID) {
        // no such user
        return res.status(400).json({ errors: ['Bad request'] });
    }
    const response = await recommendService.addMovie(UserID,MovieID)
    res.status(parseInt(response.slice(0, 3))).json();

}

module.exports = {addMovie,getRecommendation,TestCPP}
