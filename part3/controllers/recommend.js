const userService = require('../services/recommend');

const getRecommendation = async (req,res) => {
    const UserID = req.headrs['user']
    const MovieID = req.params.id
    const response = await userService.getRecommendation(UserID,MovieID)
    res.json(response)
}
const addMovie = async (req,res) => {
    const UserID = req.headrs['user']
    const MovieID = req.params.id
    const response = await userService.addMovie(UserID,MovieID)
    res.json(response)
}

module.exports = {addMovie,getRecommendation}
