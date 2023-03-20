const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki/znaków`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki/znaków`;
                break;
            case "string.email":
                err.message = `Pole powinno zawierać prawidłowy adres email`;
                break;
            default:
        }
    });
    return errors;
}

const mechanicSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
    ,
    firstName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages)
    ,
    lastName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages)
    ,
    email: Joi.string()
        .email()
        .required()
        .error(errMessages)
});

module.exports = mechanicSchema;