// const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const MechanicRepository = require('../repository/sequelize/MechanicRepository');

exports.showMechanicList = (req, res, next) => {
    MechanicRepository.getMechanics()
        .then(mcs => {
            res.render('pages/mechanic/list', {
                mcs: mcs,
                navLocation: 'mechanics'
            });
        });
}

exports.showAddMechanicForm = (req, res, next) => {
    res.render('pages/mechanic/form', {
        mc: {},
        pageTitle: req.__('mc.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('mc.form.add.btnLabel'),
        formAction: '/mechanics/add',
        navLocation: 'mechanics',
        validationErrors: []
    });
}

exports.showEditMechanicForm = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.getMechanicById(mcId)
        .then(mc => {
            res.render('pages/mechanic/form', {
                mc: mc,
                pageTitle: req.__('mc.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('mc.form.edit.btnLabel'),
                formAction: '/mechanics/edit',
                navLocation: 'mechanics',
                validationErrors: []
            });
        });
}

exports.showMechanicDetails = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.getMechanicById(mcId)
        .then(mc => {
            res.render('pages/mechanic/form', {
                mc: mc,
                pageTitle: req.__('mc.form.details.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'mechanics',
                validationErrors: []
            });
        });
}

exports.showMechanicDeleteView = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.getMechanicById(mcId)
        .then(mc => {
            res.render('pages/mechanic/delete-confirm', {
                mc: mc,
                formAction: '/mechanics/delete/' + mcId,
                navLocation: 'mechanics',
            });
        });
}


exports.addMechanic = (req, res, next) => {
    const mcData = { ...req.body };
    MechanicRepository.createMechanic(mcData)
        .then(mechanic => {
            res.redirect('/mechanics')
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('email') && e.type == 'unique violation') {
                    e.message = req.__('validationMessage.emailInUse');
                }
            });

            res.render('pages/mechanic/form', {
                mc: mcData,
                pageTitle: req.__('mc.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('mc.form.add.btnLabel'),
                formAction: '/mechanics/add',
                navLocation: 'mechanics',
                validationErrors: err.errors
            });
        });
};

exports.updateMechanic = (req, res, next) => {
    const mcId = req.body._id;
    const mcData = { ...req.body };
    MechanicRepository.updateMechanic(mcId, mcData)
        .then(mechanic => {
            res.redirect('/mechanics');
        })
        .catch(err => {
            err.errors.forEach(e => {
                if (e.path.includes('email') && e.type == 'unique validation') {
                    e.message = req.__('validationMessage.emailInUse');
                }
            });

            res.render('pages/mechanic/form', {
                mc: mcData,
                pageTitle: req.__('mc.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('mc.form.edit.btnLabel'),
                formAction: '/mechanics/edit',
                navLocation: 'mechanics',
                validationErrors: err.errors
            });
        });
};

exports.deleteMechanic = (req, res, next) => {
    const mcId = req.params.mcId;
    MechanicRepository.deleteMechanic(mcId)
        .then(() => {
            res.render('pages/mechanic/delete-info', {
                navLocation: 'mechanics',
            });
        });
};


