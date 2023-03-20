// const RepairRepository = require('../repository/mysql2/RepairRepository');
const RepairRepository = require('../repository/sequelize/RepairRepository');

exports.getRepairs = (req, res, next) => {
    RepairRepository.getRepairs()
        .then(reps => {
            res.status(200).json(reps);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRepairById = (req, res, next) => {
    const repId = req.params.repId;
    RepairRepository.getRepairById(repId)
        .then(rep => {
            if (!rep) {
                res.status(404).json({
                    message: 'Repair with id: ' + repId + ' not found'
                })
            } else {
                res.status(200).json(rep);
            }
        });
};

exports.createRepair = (req, res, next) => {
    RepairRepository.createRepair(req.body)
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

exports.updateRepair = (req, res, next) => {
    const repId = req.params.repId;
    RepairRepository.updateRepair(repId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Repair updated!', rep: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRepair = (req, res, next) => {
    const repId = req.params.repId;
    RepairRepository.deleteRepair(repId)
        .then(result => {
            res.status(200).json({ message: 'Removed repair', rep: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
