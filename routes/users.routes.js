const express = require('express');
const bodyParser = require('body-parser');

const usersController = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.route('/')
  .get((req, res, next) => usersController.getAll(req, res, next))
  .post((req, res, next) => usersController.create(req, res, next))
  .patch((req, res, next) => usersController.methodNotSupported(req, res, next))
  .put((req, res, next) => usersController.methodNotSupported(req, res, next))
  .delete((req, res, next) => usersController.methodNotSupported(req, res, next))

usersRouter.route('/:uid')
  .get((req, res, next) => usersController.getById(req, res, next))
  .post((req, res, next) => usersController.methodNotSupported(req, res, next))
  .patch((req, res, next) => usersController.updateById(req, res, next))
  .put((req, res, next) => usersController.methodNotSupported(req, res, next))
  .delete((req, res, next) => usersController.deleteById(req, res, next))

usersRouter.route('/:uid/cars')
  .get((req, res, next) => usersController.getUserCars(req, res, next))
  .post((req, res, next) => usersController.addUserCar(req, res, next))
  .patch((req, res, next) => usersController.methodNotSupported(req, res, next))
  .put((req, res, next) => usersController.methodNotSupported(req, res, next))
  .delete((req, res, next) => usersController.methodNotSupported(req, res, next))

module.exports = usersRouter;