const tokenController = require('../controllers/token');
const express = require('express');
var router = express.Router();

router.route('/')
    //everyone
    .post(tokenController.validateUser)
    
module.exports = router;