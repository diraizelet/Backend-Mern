const express = require('express');

const UsersController = require('../controllers/users-controllers');

const router = express.Router();




router.get('/', UsersController.getUsers);



router.post('/signup', UsersController.signup);

router.post('/login', UsersController.login);


module.exports = router;