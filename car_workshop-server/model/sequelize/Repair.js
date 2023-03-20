const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Repair = sequelize.define('Repair', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno być datą"
            },
        }
    },
    expectedEndDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno być datą"
            },
        }
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isInt: {
                msg: "Pole musi być liczbą całkowitą"
            },
            isInCorrectRange(value) {
                if (value && 0 >= parseInt(value) >= 1_000_000) {
                    throw new Error('Pole powinno być pomiędzy 0 a 1 000 000');
                }
            }
        }
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            len: {
                args: [0, 200],
                msg: "Pole powinno zawierać maksymalnie 200 znaków"
            }
        }
    },
    cr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    mc_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }

});

module.exports = Repair;