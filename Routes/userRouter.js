const express = require('express');
const userController = require('../Controller/user_controller');
const router = express.Router();

router.post('/create', userController.createUser);
router.get('/:userId', userController.getUserById);
router.post('/login', userController.loginUser);


module.exports = router;
