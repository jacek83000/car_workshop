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
            case "number.min":
                err.message = `Pole powinno być większe od 0`;
                break;
            case "number.max":
                err.message = `Pole powinno być mniejsze od 10 000 000`;
                break;
            default:
        }
    });
    return errors;
}

const carSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
    ,
    name: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages)
    ,
    mileage: Joi.number()
        .min(0)
        .max(10000000)
        .required()
        .error(errMessages)
    ,
    color: Joi.string()
        .min(2)
        .max(50)
        .required()
        .error(errMessages)
});

module.exports = carSchema;