// insert joi validation schemas in here - for lists, tasks, login, register

// add sanitize html extension to the basejoi object to throw an error if html used in tasks, user, list inputs


const Joi = require('joi');

const userSchema = Joi.object({
  user: Joi.object({
    name: Joi.string().min(5).max(30).required(),
    password: Joi.string().min(5).max(30).required(),
    email: Joi.string().min(5).max(100).required()
  }).required()
});

const listSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(5).max(30).required()
});

const taskSchema = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(5).max(30).required(),
});

module.exports = {
  userSchema,
  taskSchema,
  listSchema
};