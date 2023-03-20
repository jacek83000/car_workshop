// const MechanicRepository = require('../repository/mysql2/MechanicRepository');
const MechanicRepository = require('../repository/sequelize/MechanicRepository');
const authUtil = require('../util/authUtils');


exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    MechanicRepository.findByEmail(email)
        .then(mc => {
            if (!mc) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'incorrectPasswordAndEmail'
                })
            } else if (authUtil.comparePasswords(password, mc.password) === true) {
                req.session.loggedUser = mc;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'incorrectPasswordAndEmail'
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
}