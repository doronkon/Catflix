const userController = require('../controllers/user');

const express = require('express');
const router = express.Router();


router.route('/')
    //everyone
    .post(userController.createUser)
    //admin
    .get(userController.getUsers);
router.route('/:id')
    //current user + admin
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser);

module.exports = router;