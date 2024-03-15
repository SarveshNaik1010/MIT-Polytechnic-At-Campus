const multer = require('multer');
const eventModel = require('../model/eventModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const path = require('../app');

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/event');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `${req.body.eventName}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image'));
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadEventImgs = upload.fields([
  { name: 'eventPoster', maxCount: 1 },
  { name: 'eventDescImg', maxCount: 1 },
  { name: 'eventAgendaImg', maxCount: 1 },
  { name: 'eventImages' },
]);

exports.resizeImages = async (req, res, next) => {
  console.log("🍔🍔");
  if (!req.files) return next();
  for (let imgType in req.files) {
    const typeArr = [];
    await Promise.all(
      req.files[imgType].map(async (img, i) => {
        const filename = `${req.body.eventName}-${imgType}-${i + 1}.jpeg`;
        await sharp(img.buffer)
          .toFormat('jpeg')
          .jpeg({ quality: 80 })
          .toFile(`public/event/${filename}`);
        typeArr.push(filename);
      })
    );
    req.body[imgType] = typeArr.length === 1 ? typeArr[0] : typeArr;
  }
  console.log(req.files);
  next();
};

exports.getAllEvents = catchAsync(async function (req, res, next) {
  const events = await eventModel.find();
  if (!events) next(new AppError(404, 'Events not found'));
  res.status(200).json({
    status: 'Success',
    events,
  });
});

exports.getEvent = catchAsync(async function (req, res, next) {
  const event = await eventModel.findOne({ eventName: req.params.eventName });
  if (!event) {
    return next(
      new AppError(
        400,
        `There is no event with the name '${req.params.eventName}'`
      )
    );
  }

  res.status(200).json({
    status: 'Success',
    event,
  });
});

exports.getCategoryList = catchAsync(async (req, res, next) => {
  const list = (await eventModel.find({}, ['eventType', '-_id'])).map(
    (li) => li.eventType
  );
  res.status(200).json({
    status: 'success',
    list,
  });
});

exports.getEventsByCategory = catchAsync(async (req, res, next) => {
  console.log(req.params);
  const events = await eventModel.find(req.params);
  res.status(200).json({
    status: 'success',
    events,
  });
});

exports.getImage = catchAsync(async (req, res, next) => {
  res.sendFile(`../public/event/${req.url}`);
});

exports.postEvent = catchAsync(async function (req, res, next) {
  console.log(req.body);
  const event = await eventModel.create(req.body);
  res.status(200).json({
    status: 'Success',
    message: 'Event posted successfully',
  });
});

exports.deleteEvent = catchAsync(async function (req, res, next) {
  const deletedEvent = await eventModel.deleteOne({
    eventName: req.params.eventName,
  });
  res.status(204).json({
    message: 'Deleted',
  });
});
