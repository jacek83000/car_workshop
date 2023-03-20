const db = require('../../config/mysql2/db');
const repairSchema = require('../../model/joi/Repair');

exports.getRepairs = () => {
    const query = `SELECT rep._id as rep_id, rep.startDate, rep.expectedEndDate, rep.price, rep.description, 
        cr._id as cr_id, cr.name, cr.mileage, cr.color,
        mc._id as mc_id, mc.firstName, mc.lastName, mc.email
        FROM Repair rep
        left join Car cr on rep.cr_id = cr._id
        left join Mechanic mc on rep.mc_id = mc._id`

    return db.promise().query(query)
        .then((results, fields) => {
            const repairs = [];
            for (let i = 0; i < results[0].length; i++) {
                const firstRow = results[0][i];
                const repair = {
                    _id: firstRow.rep_id,
                    startDate: firstRow.startDate,
                    expectedEndDate: firstRow.expectedEndDate,
                    price: firstRow.price,
                    description: firstRow.description,
                    car: {
                        _id: firstRow.cr_id,
                        name: firstRow.name,
                        mileage: firstRow.mileage,
                        color: firstRow.color
                    },
                    mechanic: {
                        _id: firstRow.mc_id,
                        firstName: firstRow.firstName,
                        lastName: firstRow.lastName,
                        email: firstRow.email,
                    }
                };
                repairs.push(repair)
            }
            console.log(repairs);
            return repairs;
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getRepairById = (repairId) => {
    const query = `SELECT rep._id as rep_id, rep.startDate, rep.expectedEndDate, rep.price, rep.description, 
        cr._id as cr_id, cr.name, cr.mileage, cr.color,
        mc._id as mc_id, mc.firstName, mc.lastName, mc.email
        FROM Repair rep
        left join Car cr on rep.cr_id = cr._id
        left join Mechanic mc on rep.mc_id = mc._id
        where rep._id = ?`

    return db.promise().query(query, [repairId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};

            }
            const repair = {
                _id: firstRow.rep_id,
                startDate: firstRow.startDate,
                expectedEndDate: firstRow.expectedEndDate,
                price: firstRow.price,
                description: firstRow.description,
                car: {
                    _id: firstRow.cr_id,
                    name: firstRow.name,
                    mileage: firstRow.mileage,
                    color: firstRow.color
                },
                mechanic: {
                    _id: firstRow.mc_id,
                    firstName: firstRow.firstName,
                    lastName: firstRow.lastName,
                    email: firstRow.email,
                }
            };

            console.log(repair);
            return repair;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createRepair = (data) => {
    const vRes = repairSchema.validate(data, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }
    const sql = 'INSERT into Repair (cr_id, mc_id, startDate, expectedEndDate, price, description) VALUES (?, ?, ?, ?, ?, ?)'
    return db.promise().execute(sql, [data.crId, data.mcId, data.startDate, data.expectedEndDate, data.price, data.description]);
};

exports.updateRepair = (repairId, data) => {
    const vRes = repairSchema.validate(data, { abortEarly: false });

    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    data.description = data.description ? data.description : null;

    console.log('DANE ' + data.crId, data.mcId, data.startDate, data.expectedEndDate, data.price, data.description, repairId)

    const sql = `UPDATE Repair set cr_id = ?, mc_id = ?, startDate = ?, expectedEndDate = ?, price = ?, description = ? where _id = ?`;
    return db.promise().execute(sql, [data.crId, data.mcId, data.startDate, data.expectedEndDate, data.price, data.description, repairId]);
};

exports.deleteRepair = (repairId) => {
    const sql = 'DELETE FROM Repair where _id = ?'
    return db.promise().execute(sql, [repairId]);
};

exports.deleteManyRepairs = (repairIds) => {
    const sql = 'DELETE FROM Repair where _id IN (?)'
    return db.promise().execute(sql, [repairIds]);
}