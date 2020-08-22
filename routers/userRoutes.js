const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

router.route('/register').post(userController.register);

router.route('/allusers').get(userController.getAllusers);

router.route('/login').post(userController.login);

module.exports = router;
