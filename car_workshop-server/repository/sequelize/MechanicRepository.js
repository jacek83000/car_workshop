const Car = require('../../model/sequelize/Car');
const Mechanic = require('../../model/sequelize/Mechanic');
const Repair = require('../../model/sequelize/Repair');

const authUtils = require('../../util/authUtils');


exports.getMechanics = () => {
    return Mechanic.findAll();
};

exports.getMechanicById = (mcId) => {
    return Mechanic.findByPk(mcId, {
        include: [{
            model: Repair,
            as: 'repairs',
            include: [{
                model: Car,
                as: 'car'
            }]
        }]
    });
};

exports.findByEmail = (email) => {
    return Mechanic.findOne({
        where: { email: email }
    });
}

exports.createMechanic = (newMechanicData) => {
    return Mechanic.create({
        firstName: newMechanicData.firstName,
        lastName: newMechanicData.lastName,
        email: newMechanicData.email,
        password: authUtils.hashPassword(newMechanicData.password)
    });
};

exports.updateMechanic = (mcId, MechanicData) => {
    const firstName = MechanicData.firstName;
    const lastName = MechanicData.lastName;
    const email = MechanicData.email;

    return Mechanic.update(MechanicData, { where: { _id: mcId } });
};

exports.deleteMechanic = (mcId) => {
    return Mechanic.destroy({
        where: { _id: mcId }
    });
};