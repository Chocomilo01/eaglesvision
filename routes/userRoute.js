const express = require('express');
const router = express.Router();

const { adminAuthorizer, authenticate }  = require('../middlewares/authentication');
const userController = require('../controller/userController');


router.post('/', userController.createUser)
 router.get('/:id', userController.fetchOneUser)
 router.patch('/:id', userController.updateUser)
 router.get('/', userController.fetchUsers)
 router.delete('/:id', userController.deleteUser)



 module.exports = router;