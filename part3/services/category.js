const Category = require('../models/category');
const Movie = require('./movie');


const createCategory = async (name, promoted) => {
    const category = new Category({ name });
    if (promoted != null) {
        category.promoted = promoted;
    }
    return await category.save();
};

const getCategoryById = async(id) => {
    return await Category.findById(id);
};

const getCategories = async() =>{
    return await Category.find({});
};

const updateCategory = async(id,name,movie,promoted) => {
    const updatedCategory = await Category.findById(id);
    if(!updatedCategory){
        return null;
    }
    if(name){
        updatedCategory.name = name;
    }
    if(promoted != null){
        updatedCategory.promoted = promoted;
    }
    await updatedCategory.save();
    return updatedCategory;
};

const deleteCategory = async (id) => {

    const deletedCategory = await Category.findById(id);
    if(!deletedCategory){
        return null;
    }
    //delete all movies in category
    await Promise.all(deletedCategory.movies.map(async (movieId) => {
        await Movie.deleteMovie(movieId);  // Make sure deleteMovie is asynchronous
    }));
    //deletedCategory.movies.forEach((movie) => {Movie.deleteMovie(movie)});
    //delete movies
    await deletedCategory.deleteOne();
    return deletedCategory;
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };