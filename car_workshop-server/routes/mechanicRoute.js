const express = require('express');
const router = express.Router();

const mechanicController = require('../controllers/mechanicController');
const authUtils = require('../util/authUtils');

router.get('/', mechanicController.showMechanicList);
router.get('/add', authUtils.permitAuthenticatedUser, mechanicController.showAddMechanicForm);
router.get('/edit/:mcId', authUtils.permitAuthenticatedUser, mechanicController.showEditMechanicForm);
router.get('/details/:mcId', mechanicController.showMechanicDetails);
router.get('/delete/:mcId', authUtils.permitAuthenticatedUser, mechanicController.showMechanicDeleteView);

router.post('/add', authUtils.permitAuthenticatedUser, mechanicController.addMechanic);
router.post('/edit', authUtils.permitAuthenticatedUser, mechanicController.updateMechanic);
router.post('/delete/:mcId', authUtils.permitAuthenticatedUser, mechanicController.deleteMechanic);

module.exports = router;
