const express = require('express');
const router = express.Router();
const List = require('../model/list');
const User = require('../model/user');
const Task = require('../model/task');
const { listSchema } = require('../schemas')
const AppError = require('../apperror');
const { validateList } = require('../middleware')
const list = require('../controllers/lists')

// { mergeParams: true } - use this to pass through id from router

router.route('/')
    .get(list.renderLists)
    .patch(validateList, list.editList)
    .delete(list.deleteList)

router.get('/new', list.createList)

module.exports = router;