const categoryController = require('../controllers/category');
const express = require('express');
var router = express.Router();

router.route('/')
    //maybe just an admin can post
    .post(categoryController.createCategory)
    .get(categoryController.getCategories);

router.route('/:id')
    //everyone
    .get(categoryController.getCategory)
    //admin
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

router.route('/movies/:id')
    .get(categoryController.getCategoryMovies);

//for android
router.route('/index/all')
    .get(categoryController.index)
    
module.exports = router;