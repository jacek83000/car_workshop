const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Mechanic = sequelize.define('Mechanic', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            arg: true,
            msg: "Ten email jest już używany"
        },
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 50],
                msg: "Pole powinno zawierać od 2 do 50 znaków"
            },
            isEmail: {
                msg: 'Pole powinno zawierać prawidłowy adres email'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Mechanic;