const eventController = require('../controller/eventController');
const express = require('express');

const router = new express.Router();

router
  .route('/')
  .get(eventController.getAllEvents)
  .post(
    eventController.uploadEventImgs,
    eventController.resizeImages,
    eventController.postEvent
  );

router.route('/categories').get(eventController.getCategoryList);

router.route('/category/:eventType').get(eventController.getEventsByCategory)

router
  .route('/:eventName')
  .get(eventController.getEvent)
  .delete(eventController.deleteEvent);

module.exports = router;
