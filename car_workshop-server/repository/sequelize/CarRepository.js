const Car = require('../../model/sequelize/Car');
const Mechanic = require('../../model/sequelize/Mechanic');
const Repair = require('../../model/sequelize/Repair');


exports.getCars = () => {
    return Car.findAll();
};

exports.getCarById = (crId) => {
    return Car.findByPk(crId, {
        include: [{
            model: Repair,
            as: 'repairs',
            include: [{
                model: Mechanic,
                as: 'mechanic'
            }]
        }]
    });
};

exports.createCar = (newCarData) => {
    // console.log(JSON.stringify(newCarData));

    return Car.create({
        name: newCarData.name,
        mileage: newCarData.mileage,
        color: newCarData.color
    });
};

exports.updateCar = (crId, carData) => {
    const name = carData.name;
    const mileage = carData.mileage;
    const color = carData.color;

    return Car.update(carData, { where: { _id: crId } });
};

exports.deleteCar = (crId) => {
    return Car.destroy({
        where: { _id: crId }
    });
};