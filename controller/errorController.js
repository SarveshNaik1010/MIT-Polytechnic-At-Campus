exports.handleError = function (err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';
  console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
