const eventController = require('../controller/eventController');
const express = require('express');

const router = new express.Router();

router.route('/:imgname').get(eventController.getImage);

module.exports = router;
