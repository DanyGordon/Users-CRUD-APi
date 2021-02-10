const express = require('express');
const bodyParser = require('body-parser');

const carsController = require('../controllers/cars.controller');

const carsRouter = express.Router();

carsRouter.use(bodyParser.json());

carsRouter.route('/:carId')
  .get((req, res, next) => carsController.getCarById(req, res, next))
  .post((req, res, next) => carsController.methodNotSupported(req, res, next))
  .patch((req, res, next) => carsController.updateCarById(req, res, next))
  .put((req, res, next) => carsController.methodNotSupported(req, res, next))
  .delete((req, res, next) => carsController.deleteCarById(req, res, next))

module.exports = carsRouter;