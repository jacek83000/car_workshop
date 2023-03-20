const sequelize = require('./sequelize');

const Car = require('../../model/sequelize/Car');
const Mechanic = require('../../model/sequelize/Mechanic');
const Repair = require('../../model/sequelize/Repair');

const authUtil = require('../../util/authUtils');
const passHash1 = authUtil.hashPassword('123');
const passHash2 = authUtil.hashPassword('haslo');

module.exports = () => {
    Car.hasMany(Repair, { as: 'repairs', foreignKey: { name: 'cr_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Repair.belongsTo(Car, { as: 'car', foreignKey: { name: 'cr_id', allowNull: false } });
    Mechanic.hasMany(Repair, { as: 'repairs', foreignKey: { name: 'mc_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Repair.belongsTo(Mechanic, { as: 'mechanic', foreignKey: { name: 'mc_id', allowNull: false } });

    let allCrs, allMcs;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Car.findAll();
        })
        .then(crs => {
            if (!crs || crs.length === 0) {
                return Car.bulkCreate([
                    { name: 'Audi A3', mileage: 123_000, color: 'Czerwony' },
                    { name: 'BMW X5', mileage: 220_000, color: 'Niebieski' },
                ])
                    .then(() => {
                        return Car.findAll();
                    });
            } else {
                return crs;
            }
        })
        .then(crs => {
            allCrs = crs;
            return Mechanic.findAll();
        })
        .then(mcs => {
            if (!mcs || mcs.length === 0) {
                return Mechanic.bulkCreate([
                    { firstName: 'Maciej', lastName: 'Zieliński', email: 'maciej.zielinski@ryc.com', password: passHash1 },
                    { firstName: 'Krzysztof', lastName: 'Nowak', email: 'krzysztof.nowak@ryc.com', password: passHash2 }
                ])
                    .then(() => {
                        return Mechanic.findAll();
                    });
            } else {
                return mcs;
            }
        })
        .then(mcs => {
            allMcs = mcs;
            return Repair.findAll();
        })
        .then(reps => {
            if (!reps || reps.length === 0) {
                return Repair.bulkCreate([
                    { cr_id: allCrs[0]._id, mc_id: allMcs[0]._id, startDate: '2022-10-25', expectedEndDate: '2022-11-02', price: 200, description: 'Wymiana tłumika' },
                    { cr_id: allCrs[1]._id, mc_id: allMcs[0]._id, startDate: '2022-11-30', expectedEndDate: '2022-12-10', price: 500, description: null },
                    { cr_id: allCrs[0]._id, mc_id: allMcs[1]._id, startDate: '2022-11-03', expectedEndDate: '2022-11-30', price: 3000, description: 'Wymiana hamulców' }
                ]);
            } else {
                return reps;
            }
        });
};
