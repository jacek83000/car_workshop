const express = require('express');
const router = express.Router();

const repairController = require('../controllers/repairController');
const authUtils = require('../util/authUtils');

router.get('/', repairController.showRepairList);
router.get('/add', authUtils.permitAuthenticatedUser, repairController.showAddRepairForm);
router.get('/edit/:repId', authUtils.permitAuthenticatedUser, repairController.showEditRepairForm);
router.get('/details/:repId', repairController.showRepairDetails);
router.get('/delete/:repId', authUtils.permitAuthenticatedUser, repairController.showRepairDeleteView);

router.post('/add', repairController.addRepair);
router.post('/edit', authUtils.permitAuthenticatedUser, repairController.updateRepair);
router.post('/delete/:repId', authUtils.permitAuthenticatedUser, repairController.deleteRepair);

module.exports = router;