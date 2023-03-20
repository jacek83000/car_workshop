const express = require('express');
const router = express.Router();

const carApiController = require('../../api/CarAPI');
const isAuth = require('../../middleware/isAuth');

router.get('/', carApiController.getCars);
router.get('/:crId', carApiController.getCarById);
router.post('/', isAuth, carApiController.createCar);
router.put('/:crId', isAuth, carApiController.updateCar);
router.delete('/:crId', isAuth, carApiController.deleteCar);

module.exports = router;