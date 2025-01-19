const categoryService = require('../services/category');
const tokenService = require('../services/token');


const createCategory = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const category = await categoryService.createCategory(req.body.name, req.body.promoted);
    if(!category)
    {
        return res.status(404).json({ errors: ['Category already exists'] });
    }
    return res.status(201).json(category);
};

const getCategories = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const categories = await categoryService.getCategories();
    res.json(categories);
};

const getCategory = async(req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    if(!category){
        return res.status(404).json({ errors: ['Category not found or invalid ID'] });
    }
    res.json(category);
};

const updateCategory = async (req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body.name, req.body.movie, req.body.promoted);
    if(!updatedCategory){
        return res.status(404).json({ errors: ['Category not found or invalid ID'] });
    }
    res.json(updatedCategory);
};

const deleteCategory = async(req, res) => {
    const headersUser = await tokenService.validateHeadersUser(req.headers['user']);
    if (!headersUser)
    {
        return res.status(403).json({ errors: ['Invalid Token in Header'] });
    }
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if(!deletedCategory){
        return res.status(404).json({ errors: ['Category not found or invalid ID'] });
    }
    res.json(deletedCategory);
};

module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory };