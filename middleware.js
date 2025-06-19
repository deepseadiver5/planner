const AppError = require('./apperror')

const {userSchema, listSchema} = require('./schemas')

module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);
    next()
}

module.exports.validateList = (req, res, next) => {
    const { error } = listSchema.validate(req.body);
    if (error) throw new AppError(error.details[0].message, 400);
    next()
}
