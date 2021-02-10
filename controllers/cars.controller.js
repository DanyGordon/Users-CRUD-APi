const Cars = require('../models/car.model');

exports.getCarById = async (req, res, next) => {
	try {
		const car = await Cars.findById(req.params.carId).populate('owner');
		if (car !== null) {
			res.status(200).json(car);
		} else {
			res.status(404).send(`Car with id ${req.params.carId} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.updateCarById = async (req, res, next) => {
	try {
		const car = await Cars.findById(req.params.carId);
		if (car !== null) {
			const updatedCar = await Cars.findByIdAndUpdate(req.params.carId, { $set: req.body }, { new: true }).populate('owner');
			res.status(200).json(updatedCar);
		} else {
			res.status(404).send(`Cars with id ${req.params.carId} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.deleteCarById = async (req, res, next) => {
	try {
		const car = await Cars.findById(req.params.carId);
		if (car !== null) {
			await Cars.findByIdAndRemove(req.params.carId);
			res.status(204).end();
		} else {
			res.status(404).send(`Cars with id ${req.params.carId} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.methodNotSupported = async (req, res, next) => {
	res.status(403).send(`${req.method} operations not supported on /cars${req.url}!`)
}