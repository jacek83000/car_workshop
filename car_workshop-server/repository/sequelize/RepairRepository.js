const Sequelize = require('sequelize');

const Car = require('../../model/sequelize/Car');
const Mechanic = require('../../model/sequelize/Mechanic');
const Repair = require('../../model/sequelize/Repair');


exports.getRepairs = () => {
    return Repair.findAll({
        include: [
            {
                model: Car,
                as: 'car'
            },
            {
                model: Mechanic,
                as: 'mechanic'
            }
        ]
    });
};

exports.getRepairById = (repId) => {
    return Repair.findByPk(repId, {
        include: [
            {
                model: Car,
                as: 'car'
            },
            {
                model: Mechanic,
                as: 'mechanic'
            }
        ]
    });
};

exports.createRepair = (data) => {
    console.log(JSON.stringify(data));

    return Repair.create({
        cr_id: data.cr_id,
        mc_id: data.mc_id,
        startDate: data.startDate,
        expectedEndDate: data.expectedEndDate,
        price: data.price,
        description: data.description
    });
};

exports.updateRepair = (repId, data) => {
    return Repair.update(data, { where: { _id: repId } });
};

exports.deleteRepair = (repId) => {
    return Repair.destroy({
        where: { _id: repId }
    });
};

exports.deleteManyRepairs = (repIds) => {
    return Repair.find({ _id: { [Sequelize.Op.in]: repIds } })
};