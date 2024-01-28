const path = require('path');
const express = require('express');
const cors = require('cors');
const eventRouter = require('./router/eventRouter');
const imgRouter = require('./router/imgRouter');
const errorController = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();

app.use(cors());

// Increase the payload size limit (e.g., 10MB)
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// app.get('/demo', function(req, res, next) {
//   res.status(200).render('demo');
// })

app.use('/api/v1/events', eventRouter);

app.get('/api/v1/eventimgs/:img', async function (req, res, next) {
  const imgPath = path.join(__dirname, '/public/event', req.params.img);
  res.sendFile(imgPath, (err) => {
    if (err) next(new AppError(400, 'Invalid image URL'));
  });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

app.use(errorController.handleError);

module.exports = app;
