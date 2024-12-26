const searchService = require('../services/search');

const search = async(req,res) => {
    const search = await searchService.getSearchResult(req.params.query);
    res.json(search);
};


// const movie = await movieService.getMovieById(req.params.id);
// const promoted = await modelCategory.find({ promoted: true }).populate('movies');
