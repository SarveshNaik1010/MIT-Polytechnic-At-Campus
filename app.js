const path = require('path');
const express = require('express');
const cors = require('cors');
const eventRouter = require('./router/eventRouter');
const imgRouter = require('./router/imgRouter');
const errorController = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// app.get('/demo', function(req, res, next) {
//   res.status(200).render('demo');
// })

app.use('/api/v1/events', eventRouter);

app.get('/api/v1/eventimgs/:img', async function (req, res, next) {
  console.log(req.headers);
  const imgPath = path.join(__dirname, '/public/event', req.params.img);
  res.sendFile(imgPath, (err) => {
    if (err) next(new AppError(400, 'Invalid image URL'));
  });
});

app.use(errorController.handleError);

module.exports = app;
