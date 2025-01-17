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
    const UserID = headersUser._id
    const MovieID = req.params.id
    if (!UserID || !MovieID) {
        // no such user
        return res.status(400).json({ errors: ['Bad request no Movie ID'] });
    }
    const response = await recommendService.getRecommendation(UserID,MovieID)
    if(!response)
    {
        return res.status(404).json({ errors: ['Movie not found'] });
    }
    if(response[0]=='4')
    {
        return res.status(400).json({ errors: ['Not published Movie for this User'] });
    }
    if(response.length === 0)
    {
        res.status(204).json()
    }
    res.json(response)
}
const addMovie = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    const UserID = headersUser._id
    const MovieID = req.params.id
    if (!UserID || !MovieID) {
        // no such user
        return res.status(400).json({ errors: ['Bad request no Movie ID'] });
    }
    const response = await recommendService.addMovie(UserID,MovieID)
    if(!response)
    {
        return res.status(404).json({ errors: ['Movie not found or the user didn\'t watch the movie'] });
    }
    res.status(parseInt(response.slice(0, 3))).json();

}

module.exports = {addMovie,getRecommendation,TestCPP}
