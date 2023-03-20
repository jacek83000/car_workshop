const express = require('express');
const router = express.Router();

const repairApiController = require('../../api/RepairAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', repairApiController.getRepairs);
router.get('/:repId', repairApiController.getRepairById);
router.post('/', isAuth, repairApiController.createRepair);
router.put('/:repId', isAuth, repairApiController.updateRepair);
router.delete('/:repId', isAuth, repairApiController.deleteRepair);

module.exports = router;