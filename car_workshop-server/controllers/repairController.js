// const RepairRepository = require('../repository/mysql2/RepairRepository');
// const CarRepository = require('../repository/mysql2/CarRepository');
// const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const RepairRepository = require('../repository/sequelize/RepairRepository');
const CarRepository = require('../repository/sequelize/CarRepository');
const MechanicRepository = require('../repository/sequelize/MechanicRepository');

exports.showRepairList = (req, res, next) => {
    RepairRepository.getRepairs()
        .then(reps => {
            res.render('pages/repair/list', {
                reps: reps,
                navLocation: 'repairs'
            });
        });
}

exports.showAddRepairForm = (req, res, next) => {
    let allCrs, allMcs;
    CarRepository.getCars()
        .then(crs => {
            allCrs = crs;
            return MechanicRepository.getMechanics();
        })
        .then(mcs => {
            allMcs = mcs;
            res.render('pages/repair/form', {
                rep: {},
                pageTitle: req.__('rep.form.add.pageTitle'),
                formMode: 'createNew',
                allCrs: allCrs,
                allMcs: allMcs,
                btnLabel: req.__('rep.form.add.btnLabel'),
                formAction: '/repairs/add',
                navLocation: 'repairs',
                validationErrors: []
            })
        });
}

exports.showEditRepairForm = (req, res, next) => {
    const repId = req.params.repId;
    let repair, allCrs, allMcs;
    RepairRepository.getRepairById(repId)
        .then(rep => {
            repair = rep;
            return MechanicRepository.getMechanics();
        })
        .then(mcs => {
            allMcs = mcs;
            return CarRepository.getCars();
        })
        .then(crs => {
            allCrs = crs;
            res.render('pages/repair/form', {
                rep: repair,
                pageTitle: req.__('rep.form.edit.pageTitle'),
                formMode: 'edit',
                allCrs: allCrs,
                allMcs: allMcs,
                btnLabel: req.__('rep.form.edit.btnLabel'),
                formAction: '/repairs/edit',
                navLocation: 'repairs',
                validationErrors: []
            });
        });
}

exports.showRepairDetails = (req, res, next) => {
    const repId = req.params.repId;
    let repair, allCrs, allMcs;
    RepairRepository.getRepairById(repId)
        .then(rep => {
            repair = rep;
            return MechanicRepository.getMechanics();
        })
        .then(mcs => {
            allMcs = mcs;
            return CarRepository.getCars();
        })
        .then(crs => {
            allCrs = crs;
            res.render('pages/repair/form', {
                rep: repair,
                pageTitle: req.__('rep.form.details.pageTitle'),
                formMode: 'showDetails',
                allCrs: allCrs,
                allMcs: allMcs,
                formAction: '',
                navLocation: 'repairs',
                validationErrors: []
            }
            );
        });
}

exports.showRepairDeleteView = (req, res, next) => {
    const repId = req.params.repId;
    RepairRepository.getRepairById(repId)
        .then(rep => {
            res.render('pages/repair/delete-confirm', {
                rep: rep,
                formAction: '/repairs/delete/' + repId,
                navLocation: 'repairs',
            });
        });
}


exports.addRepair = (req, res, next) => {
    const repData = { ...req.body };
    RepairRepository.createRepair(repData)
        .then(repair => {
            res.redirect('/repairs');
        })
        .catch(err => {
            let allCrs, allMcs;
            CarRepository.getCars()
                .then(crs => {
                    allCrs = crs;
                    return MechanicRepository.getMechanics();
                })
                .then(mcs => {
                    allMcs = mcs;
                    res.render('pages/repair/form', {
                        rep: {},
                        pageTitle: req.__('rep.form.add.pageTitle'),
                        formMode: 'createNew',
                        allCrs: allCrs,
                        allMcs: allMcs,
                        btnLabel: req.__('rep.form.add.btnLabel'),
                        formAction: '/repairs/add',
                        navLocation: 'repairs',
                        validationErrors: err.errors
                    })
                });
        });
};

exports.updateRepair = (req, res, next) => {
    const repId = req.body._id;
    const repData = { ...req.body };
    RepairRepository.updateRepair(repId, repData)
        .then(repair => {
            res.redirect('/repairs');
        })
        .catch(err => {
            let repair, allCrs, allMcs;
            RepairRepository.getRepairById(repId)
                .then(rep => {
                    repair = rep;
                    return MechanicRepository.getMechanics();
                })
                .then(mcs => {
                    allMcs = mcs;
                    return CarRepository.getCars();
                })
                .then(crs => {
                    allCrs = crs;
                    res.render('pages/repair/form', {
                        rep: repair,
                        pageTitle: req.__('rep.form.edit.pageTitle'),
                        formMode: 'edit',
                        allCrs: allCrs,
                        allMcs: allMcs,
                        btnLabel: req.__('rep.form.edit.btnLabel'),
                        formAction: '/repairs/edit',
                        navLocation: 'repairs',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteRepair = (req, res, next) => {
    const repId = req.params.repId;
    RepairRepository.deleteRepair(repId)
        .then(() => {
            res.render('pages/repair/delete-info', {
                navLocation: 'repairs',
            });
        });
};



