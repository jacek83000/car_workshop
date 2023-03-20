const express = require('express');
const router = express.Router();

const mechanicApiController = require('../../api/MechanicAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', mechanicApiController.getMechanics);
router.get('/:mcId', mechanicApiController.getMechanicById);
router.get('/exist/email', mechanicApiController.findByEmail);
router.post('/', isAuth, mechanicApiController.createMechanic);
router.put('/:mcId', isAuth, mechanicApiController.updateMechanic);
router.delete('/:mcId', isAuth, mechanicApiController.deleteMechanic);

module.exports = router;