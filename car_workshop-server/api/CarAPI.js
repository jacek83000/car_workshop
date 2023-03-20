const CarRepository = require('../repository/sequelize/CarRepository');

exports.getCars = (req, res, next) => {
    CarRepository.getCars()
        .then(crs => {
            res.status(200).json(crs);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCarById = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.getCarById(crId)
        .then(cr => {
            if (!cr) {
                res.status(404).json({
                    message: 'Car with id: ' + crId + ' not found'
                })
            } else {
                res.status(200).json(cr);
            }
        });
};

exports.createCar = (req, res, next) => {
    CarRepository.createCar(req.body)
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

exports.updateCar = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.updateCar(crId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Car updated!', cr: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCar = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.deleteCar(crId)
        .then(result => {
            res.status(200).json({ message: 'Removed car', cr: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

