const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');
const authUtils = require('../util/authUtils');

router.get('/', carController.showCarList);
router.get('/add', authUtils.permitAuthenticatedUser, carController.showAddCarForm);
router.get('/edit/:crId', authUtils.permitAuthenticatedUser, carController.showEditCarForm);
router.get('/details/:crId', carController.showCarDetails);
router.get('/delete/:crId', authUtils.permitAuthenticatedUser, carController.showCarDeleteView)

router.post('/add', authUtils.permitAuthenticatedUser, carController.addCar);
router.post('/edit', authUtils.permitAuthenticatedUser, carController.updateCar);
router.post('/delete/:crId', authUtils.permitAuthenticatedUser, carController.deleteCar);

module.exports = router;
