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
    if(movie && !updatedCategory.movies.includes(movie)){
        updatedCategory.movies.push(movie);
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
    await deletedCategory.deleteOne();
    return deletedCategory;
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory };