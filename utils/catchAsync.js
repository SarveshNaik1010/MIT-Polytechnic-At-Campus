const { model } = require('mongoose');
const AppError = require('./appError');

module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
};

