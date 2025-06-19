const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const List = require('../model/list');
const User = require('../model/user');
const { userSchema } = require('../schemas')
const AppError = require('../apperror');
const user = require('../controllers/users')
const {validateUser} = require('../middleware')

router.route('/login')
    .get(user.renderLogin)
    .post(user.login)

router.get('/logout', user.logout)

router.route('/register')
.get(user.renderRegister)
.post(validateUser, user.register)

module.exports = router;