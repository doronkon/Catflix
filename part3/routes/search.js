const searchController = require('../controllers/search');
const express = require('express');
var router = express.Router();

router.route('/:query')
    //everyone
    .get(searchController.search)

module.exports = router;