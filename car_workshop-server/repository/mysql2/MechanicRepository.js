const db = require('../../config/mysql2/db');
const mechanicSchema = require('../../model/joi/Mechanic');

exports.getMechanics = () => {
    return db.promise().query('SELECT * FROM Mechanic')
        .then((results, fields) => {
            console.log(results[0]);
            return results[0];
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.getMechanicById = (mcId) => {
    const query = `SELECT mc._id as mc_id, mc.firstName, mc.lastName, mc.email, 
    rep._id as rep_id, rep.startDate, rep.expectedEndDate, rep.price, rep.description,
    cr._id as cr_id, cr.name, cr.mileage, cr.color 
    FROM Mechanic mc
    LEFT JOIN Repair rep ON rep.mc_id = mc._id
	LEFT JOIN Car cr ON rep.cr_id = cr._id
    WHERE mc._id = ?`

    return db.promise().query(query, [mcId])
        .then((results, fields) => {

            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }

            const mechanic = {
                _id: parseInt(mcId),
                firstName: firstRow.firstName,
                lastName: firstRow.lastName,
                email: firstRow.email,
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
                        car: {
                            _id: row.cr_id,
                            name: row.name,
                            mileage: row.mileage,
                            color: row.color
                        }
                    };
                    mechanic.repairs.push(repair);
                }
            }
            return mechanic;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};

exports.createMechanic = (newMechanicData) => {
    const vRes = mechanicSchema.validate(newMechanicData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = newMechanicData.firstName;
    const lastName = newMechanicData.lastName;
    const email = newMechanicData.email;

    const sql = 'INSERT into Mechanic (firstName, lastName, email) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [firstName, lastName, email]);
};

exports.updateMechanic = (mcId, newMechanicData) => {
    const vRes = mechanicSchema.validate(newMechanicData, { abortEarly: false });
    if (vRes.error) {
        return Promise.reject(vRes.error);
    }

    const firstName = newMechanicData.firstName;
    const lastName = newMechanicData.lastName;
    const email = newMechanicData.email;

    const sql = `UPDATE Mechanic set firstName = ?, lastName = ?, email = ? where _id = ?`;
    return db.promise().execute(sql, [firstName, lastName, email, mcId]);
};

exports.deleteMechanic = (mcId) => {
    const sql1 = 'DELETE FROM Repair where mc_id = ?'
    const sql2 = 'DELETE FROM Mechanic where _id = ?'

    return db.promise().execute(sql1, [mcId])
        .then(() => {
            return db.promise().execute(sql2, [mcId])
        });
};

//unique email

exports.findByEmail = (email) => {
    const query = `SELECT _id, firstName, lastName, email, password 
    FROM Mechanic 
    WHERE email = ?`

    return db.promise().query(query, [email])
        .then((results, fields) => {

            const firstRow = results[0][0];
            if (!firstRow) {
                return {};
            }

            const mechanic = {
                email: firstRow.email,
                password: firstRow.password
            }

            return mechanic;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}