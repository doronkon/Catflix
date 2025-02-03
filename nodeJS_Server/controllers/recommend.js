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
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const UserID = headersUser._id.toString()
    const MovieID = req.params.id
    if (!UserID || !MovieID) {
        // no such user
        return res.status(400).json({ errors: ['Bad request no Movie ID'] });
    }
    const response = await recommendService.getRecommendation(UserID,MovieID)
    if(!response || response === null || response === undefined)
    {
        return res.status(404).json({ errors: ['Movie not found'] });
    }
    if(response[0]=='4')
    {
        return res.status(400).json({ errors: ['Not published Movie for this User'] });
    }
    if(response.length === 0 || Object.keys(response).length === 0)
    {
        return res.status(204).json()
    }
    return res.status(200).json(response)
}
const addMovie = async (req,res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const UserID = headersUser._id.toString()
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
    return res.status(parseInt(response.slice(0, 3))).json();

}

module.exports = {addMovie,getRecommendation,TestCPP}
