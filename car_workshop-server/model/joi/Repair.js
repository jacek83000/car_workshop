const Joi = require('joi');


const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "date.empty":
                err.message = "Data jest pusta???";
                break;
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.max":
                err.message = `Pole powinno zawierać maksymalnie ${err.local.limit} znaków`;
                break;
            case "number.min":
                err.message = `Pole powinno być większe od 0`;
                break;
            case "number.max":
                err.message = `Pole powinno być mniejsze od 1 000 000`;
                break;
            default:
        }
    });
    return errors;
}

const repairSchema = Joi.object({
    _id: Joi.number()
        .optional()
        .allow("")
    ,
    mcId: Joi.number()
        .required()
        .error(errMessages)
    ,
    crId: Joi.number()
        .required()
        .error(errMessages)
    ,
    startDate: Joi.date()
        .required()
        .error(errMessages)
    ,
    expectedEndDate: Joi.date()
        .required()
        .error(errMessages)
    ,
    price: Joi.number()
        .min(0)
        .max(1000000)
        .required()
        .error(errMessages)
    ,
    description: Joi.string()
        .optional()
        .allow("")
        .max(200)
        .error(errMessages)
    ,
});

module.exports = repairSchema;