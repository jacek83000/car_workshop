const db = require('../../config/mysql2/db');
const carSchema = require('../../model/joi/Car');

exports.getCars = () => {
    return db.promise().query('SELECT * FROM Car')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getCarById = (crId) => {
    const query = `SELECT cr._id as cr_id, cr.name, cr.mileage, cr.color, 
    rep._id as rep_id, rep.startDate, rep.expectedEndDate, rep.price, rep.description,
    mc._id as mc_id, mc.firstName, mc.lastName, mc.email 
    FROM Car cr
    LEFT JOIN Repair rep ON rep.cr_id = cr._id
	LEFT JOIN Mechanic mc ON rep.mc_id = mc._id
    WHERE cr._id = ?`

    return db.promise().query(query, [crId])
        .then((results, fields) => {
            const firstRow = results[0][0];
            if (!firstRow) {
                return {};

            }

            const car = {
                _id: parseInt(crId),
                name: firstRow.name,
                mileage: firstRow.mileage,
                color: firstRow.color,
                repairs: []
            }

            for (let i = 0; i < results[0].length; i++) {
                const row = results[0][i];
                if (row.rep_id) {
                    const repair = {
                        _id: row.rep_id,
                        startDate: row.startDate,
                        expectedEndDate: row.expectedEndDate,
                        price: row.price,
                        description: row.description,
                        mechanic: {
                            _id: row.mc_id,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            email: row.email,
                        }
                    };
                    car.repairs.push(repair);
                }
            }
            return car;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createCar = (newCarData) => {
    const vRes = carSchema.validate(newCarData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const name = newCarData.name;
    const mileage = newCarData.mileage;
    const color = newCarData.color;

    const sql = 'INSERT into Car (name, mileage, color) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [name, mileage, color]);
};

exports.updateCar = (crId, newCarData) => {
    const vRes = carSchema.validate(newCarData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const name = newCarData.name;
    const mileage = newCarData.mileage;
    const color = newCarData.color;

    const sql = `UPDATE Car set name = ?, mileage = ?, color = ? where _id = ?`;
    return db.promise().execute(sql, [name, mileage, color, crId]);
};

exports.deleteCar = (crId) => {
    const sql1 = 'DELETE FROM Repair where cr_id = ?'
    const sql2 = 'DELETE FROM Car where _id = ?'

    return db.promise().execute(sql1, [crId])
        .then(() => {
            return db.promise().execute(sql2, [crId])
        });
};