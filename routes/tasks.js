const express = require('express');
const router = express.Router();
const Task = require('../model/task');
const List = require('../model/list');
const seedDatabase = require('../seed');
const { taskSchema } = require('../schemas')
const AppError = require('../apperror');
const { validateList } = require('../middleware')
const task = require('../controllers/tasks')

// { mergeParams: true } - use this to pass through id from router

// definitely need to refactor to RESTful routes for all routes

router.patch('/:id/edit', task.editTaskStatus)

router.patch('/editName', validateList, task.editTaskName)

router.delete('/delete', task.deleteTask)

router.get('/seed', task.seedTasks)

router.get('/deleteall', task.deleteAllTasks)

router.get('/new/:id', task.createTask)

router.get('/:id', task.showTasks)

module.exports = router;