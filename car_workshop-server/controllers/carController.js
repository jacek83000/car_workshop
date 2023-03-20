// const CarRepository = require('../repository/mysql2/CarRepository');
const CarRepository = require('../repository/sequelize/CarRepository');

exports.showCarList = (req, res, next) => {
    CarRepository.getCars()
        .then(crs => {
            res.render('pages/car/list', {
                crs: crs,
                navLocation: 'cars'
            });
        });
}

exports.showAddCarForm = (req, res, next) => {
    res.render('pages/car/form', {
        cr: {},
        pageTitle: req.__('cr.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('cr.form.add.btnLabel'),
        formAction: '/cars/add',
        navLocation: 'cars',
        validationErrors: []
    });
}

exports.showEditCarForm = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.getCarById(crId)
        .then(cr => {
            res.render('pages/car/form', {
                cr: cr,
                pageTitle: req.__('cr.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('cr.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.showCarDetails = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.getCarById(crId)
        .then(cr => {
            res.render('pages/car/form', {
                cr: cr,
                pageTitle: req.__('cr.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'cars',
                validationErrors: []
            });
        });
}

exports.showCarDeleteView = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.getCarById(crId)
        .then(cr => {
            res.render('pages/car/delete-confirm', {
                cr: cr,
                formAction: '/cars/delete/' + crId,
                navLocation: 'cars',
            });
        });
}


exports.addCar = (req, res, next) => {
    const crData = { ...req.body };
    CarRepository.createCar(crData)
        .then(car => {
            res.redirect('/cars')
        })
        .catch(err => {
            res.render('pages/car/form', {
                cr: crData,
                pageTitle: req.__('cr.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('cr.form.add.btnLabel'),
                formAction: '/cars/add',
                navLocation: 'cars',
                validationErrors: err.errors
            });
        });
};

exports.updateCar = (req, res, next) => {
    const crId = req.body._id;
    const crData = { ...req.body };
    CarRepository.updateCar(crId, crData)
        .then(car => {
            res.redirect('/cars')
        })
        .catch(err => {
            res.render('pages/car/form', {
                cr: crData,
                pageTitle: req.__('cr.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('cr.form.edit.btnLabel'),
                formAction: '/cars/edit',
                navLocation: 'cars',
                validationErrors: err.errors
            });
        });
};

exports.deleteCar = (req, res, next) => {
    const crId = req.params.crId;
    CarRepository.deleteCar(crId)
        .then(() => {
            res.render('pages/car/delete-info', {
                navLocation: 'cars',
            });
        });
};


