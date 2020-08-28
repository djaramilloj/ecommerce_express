const Joi = require('@hapi/joi');
const boom = require('@hapi/boom');

function validate(data, Schema) {
    const {error} = Joi.object(Schema).validate(data)
    return error;
}

function validationHandler(schema, check="body") {
    return function (req, res, next) {
        const error = validate(req[check], schema);
        error ? next(boom.badRequest()) : next();
    }
}


module.exports = validationHandler;