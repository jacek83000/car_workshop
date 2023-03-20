const Sequelize = require('sequelize');

const sequelize = new Sequelize('car_workshop', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;