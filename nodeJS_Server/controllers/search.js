const searchService = require('../services/search');
const tokenService = require('../services/token');


const search = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(400).json({ errors: ['Header User doesn\'t exist'] });
    }
    try {
        const searchResult = await searchService.getSearchResult(req.params.query);
        res.json(searchResult);
    } catch (error) {
        console.error('Error fetching search results:', error);
        res.status(500).json({ error: 'An error occurred while fetching search results.' });
    }
};

// Export the `search` function
module.exports = {
    search,
};
