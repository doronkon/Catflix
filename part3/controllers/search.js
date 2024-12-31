const searchService = require('../services/search');

const search = async (req, res) => {
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
