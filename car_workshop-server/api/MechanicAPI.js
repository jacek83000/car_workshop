const MechanicRepository = require('../repository/sequelize/MechanicRepository');

exports.getMechanics = (req, res, next) => {
    MechanicRepository.getMechanics()
        .then(mcs => {
            res.status(200).json(mcs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getMechanicById = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.getMechanicById(mcId)
        .then(mc => {
            if (!mc) {
                res.status(404).json({
                    message: 'Mechanic with id: ' + mcId + ' not found'
                })
            } else {
                res.status(200).json(mc);
            }
        });
};

exports.findByEmail = (req, res, next) => {
    const email = req.body.email

    MechanicRepository.findByEmail(email)
        .then(mc => {
            if (!mc) {
                res.status(404).json({
                    message: 'Email ' + email + ' is already taken'
                })
            } else {
                res.status(200).json({ emailValid: true });
            }
        });
};

exports.createMechanic = (req, res, next) => {
    MechanicRepository.createMechanic(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateMechanic = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.updateMechanic(mcId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Mechanic updated!', mc: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteMechanic = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.deleteMechanic(mcId)
        .then(result => {
            res.status(200).json({ message: 'Removed mechanic', mc: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

