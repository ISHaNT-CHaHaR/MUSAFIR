const Tour = require('./../models/guideTour');
const features = require('./../utils/Features');
const catchAsync = require('./../utils/catchAsync');
const appErr = require('./../utils/appErr');

exports.topcheap = (req, res, next) => {
   req.query.limit = '5';
   req.query.sort = 'price';
   req.query.fields = 'place,provider,duration,price,summary';
   next();
};

exports.getallTours = catchAsync(async (req, res) => {
   try {
      const Features = new features(Tour.find(), req.query)
         .filter()
         .sort()
         .paginate()
         .fields();

      const Tours = await Features.query;
      res.status(200).json({
         status: 'success',
         length: Tours.length,
         data: {
            Tours,
         },
      });
   } catch (err) {
      res.status(404).json({
         error: err,
         message: err.message,
      });
   }
});

exports.getTour = catchAsync(async (req, res, next) => {
   const tour = await Tour.findById(req.params.id);
   if (!tour) {
      return next(appErr('No Guide Tour with this id', 404));
   }
   res.status(200).json({
      status: 'success!',
      data: tour,
   });
});

exports.postTour = catchAsync(async (req, res) => {
   const newTour = await Tour.create(req.body);

   await res.status(201).json({
      status: 'success',
      data: {
         tour: newTour,
      },
   });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
   const tour = await Tour.findByIdAndDelete(req.params.id);

   if (!tour) {
      return next(appErr('No Tour with this ID', 404));
   }

   res.status(204).json({
      status: 'success',
      data: null,
   });
});

exports.updateTour = catchAsync(async (req, res, next) => {
   const updateOne = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!updateOne) {
      return next(appErr('No Tour with this ID', 404));
   }

   res.status(200).json({
      status: 'success',
      data: { updateOne },
   });
});

exports.placesSort = catchAsync(async (req, res, next) => {
   let place = req.params.place;

   const Placetour = await Tour.find({
      place: `${place}`,
   });

   if (!Placetour) {
      return next(appErr('No Requested Data found!', 404));
   }
   res.status(200).json({
      status: 'success',
      data: {
         Placetour,
      },
   });
   next();
});

// exports.cheapByPlace = catchAsync(async (req, res, next) => {
//    let place = req.params.place;
//    req.query.limit = '5';
//    req.query.sort = 'price';
//    req.query.fields = 'place,provider,duration,price,summary';

// const placeTour = await Tour.find({
//    place = `${place}`,
// })

//    const Features = new features(placeTour,req.query)
//    .sort()
//    .filter()
//    .paginate()
//    .limit();

//       const Tours = await Features.query;

// });
