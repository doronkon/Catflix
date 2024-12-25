const Category = require('../models/category');


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
    const { deleteMovie } = require('./movie');
    const deletedCategory = await Category.findById(id);
    if(!deletedCategory){
        return null;
    }
    //delete all movies in category
    const movieIds = deletedCategory.movies;  // List of movie ObjectIds
    for (const movieId of movieIds) {
        await deleteMovie(movieId);  // Call deleteMovie function for each movie
    }

    //delete movies
    await deletedCategory.deleteOne();
    return deletedCategory;
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };