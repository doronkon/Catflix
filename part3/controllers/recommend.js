const recommendService = require('../services/recommend');

const getRecommendation = async (req,res) => {
    const UserID = req.headers['user']
    const MovieID = req.params.id
    const response = await recommendService.getRecommendation(UserID,MovieID)
    res.json(response)
}
const addMovie = async (req,res) => {
    const UserID = req.headers['user']
    const MovieID = req.params.id
    const response = await recommendService.addMovie(UserID,MovieID)
    res.status(parseInt(response.slice(0, 3))).json();

}

module.exports = {addMovie,getRecommendation}
