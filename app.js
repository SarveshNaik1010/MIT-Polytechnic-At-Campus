const path = require('path');
const express = require('express');
const eventRouter = require('./router/eventRouter');
const errorController = require('./controller/errorController');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/v1/events', eventRouter);

app.use(errorController.handleError);

module.exports = app;
