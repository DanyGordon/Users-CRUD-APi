const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config')

const usersRouter = require('./routes/users.routes');
const carsRouter = require('./routes/cars.routes');

const url = config.dbUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Successful connected to database');
}, (err) => {
    console.log(err);
});

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);
app.use('/cars', carsRouter);

app.use((req, res, next) => {
    res.status(404).send(`[Error 404]: Not found on ${req.url} endpoint!`);
})

app.listen(8080);

module.exports = app;