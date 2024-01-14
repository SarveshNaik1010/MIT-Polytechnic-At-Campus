const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // Basic information
  eventName: {
    type: String,
    required: [true, 'An event must have a name'],
  },
  eventType: {
    type: String,
    required: [true, 'An event must have a type'],
  },
  eventDate: {
    type: Date,
    required: [true, 'There must be a date associated with the event'],
  },
  eventVenue: {
    type: String,
    required: [true, 'An event must have a guest'],
  },
  eventPoster: {
    type: String,
    required: [true, 'An event must have a poster'],
  },

  //Event Description
  eventDescText: {
    type: String,
    required: [true, 'An event must have some description'],
  },
  eventDescImg: {
    type: String,
    required: [true, 'An event must have a description image'],
  },

  //Event Agenda
  eventAgenda: [
    {
      type: String,
    },
  ],

  eventAgendaImg: {
    type: String,
  },

  //Event Report
  eventReport: [],

  //Images
  eventImages: [
    {
      type: String,
      required: [true, 'An event must have images'],
    },
  ],

  //Other
  postedAt: Date,
});

eventSchema.pre('save', function (next) {
  this.postedAt = new Date();
  next();
});

const eventModel = mongoose.model('events', eventSchema);

module.exports = eventModel;
