const Users = require('../models/user.model');
const Cars = require('../models/car.model');

exports.getAll = async (req, res, next) => {
  	try {
    	    	const users = await Users.find({}).populate('cars');
    	    	res.status(200).json(users);
  	} catch (error) {
    		next(error);   
  	}   
}

exports.getById = async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.uid).populate('cars');
		if (user !== null) {
			res.status(200).json(user);
		} else {
			res.status(404).send(`User with id ${req.params.uid} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.create = async (req, res, next) => {
	try {
		const createdUser = await Users.create(req.body);
		res.location(getCurrentUrl(req) + createdUser._id);
		res.status(201).end();
	} catch (error) {
		next(error);
	}
}

exports.deleteById = async (req, res, next) => {
	try {
		await Users.findByIdAndRemove(req.params.uid);
		res.status(204).end();
	} catch (error) {
		next(error);
	}
}

exports.updateById = async (req, res, next) => {
	try {
		const updatedUser = await Users.findByIdAndUpdate(req.params.uid, { $set: req.body }, { new: true }).populate('cars');
		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
}

exports.addUserCar = async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.uid).populate('cars');
		if (user !== null) {
			req.body.owner = user._id;
			const car = await Cars.create(req.body);
			user.cars.push(car);
			await user.save();
			res.location(req.protocol + '://' + req.get('host') + '/cars/' + car._id)
			res.status(201).end();
		} else {
			res.status(404).send(`User with id ${req.params.uid} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.getUserCars = async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.uid).populate('cars');
		if (user !== null) {
			res.status(200).json(user.cars);
		} else {
			res.status(404).send(`User with id ${req.params.uid} not found!`);
		}
	} catch (error) {
		next(error);
	}
}

exports.methodNotSupported = async (req, res, next) => {
	res.status(403).send(`${req.method} operations not supported on /user${req.url}!`)
}

function getCurrentUrl(req) {
	let endpoint = req.originalUrl;
	if (!endpoint.endsWith('/')) {
		endpoint = req.originalUrl + '/'
	}
	return req.protocol + '://' + req.get('host') + endpoint;
}
