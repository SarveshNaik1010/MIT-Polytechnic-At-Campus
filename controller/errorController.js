const AppError = require('../utils/appError');

const createNewError = function (err) {
  return new AppError(400, err.message);
};

exports.handleError = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  let error = Object.create(err);
  if (!err.isOperational) {
    error.message = createNewError(err).message;
  }
  console.log(error);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
