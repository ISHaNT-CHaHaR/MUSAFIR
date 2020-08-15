const Tour = require('./../models/guideTour');

exports.getallTours = async (req, res) => {
   try {
      const Tours = await Tour.find();
      res.status(200).json({
         status: 'success',
         data: {
            Tours,
         },
      });
   } catch (err) {
      res.staus(402).json({
         error: err,
         message: err.message,
      });
   }
};

exports.getTour = async (req, res) => {
   const tour = await Tour.findById(req.params.id);
   if (!tour) {
      res.status(404).json({
         data: 'Not Found!',
      });
   }
   res.status(200).json({
      status: 'success!',
      data: tour,
   });
};

exports.postTour = async (req, res) => {
   const newTour = await Tour.create(req.body);

   await res.status(201).json({
      status: 'success',
      data: {
         tour: newTour,
      },
   });
};

exports.deleteTour = async (req, res) => {
   await Tour.findByIdAndDelete(req.params.id);
   res.status(201).json({
      status: 'success',
   });
};

exports.updateTour = async (req, res) => {
   const updateOne = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!updateOne) {
      res.status(404).json({
         message: 'Tour Not found!',
      });
   }

   res.status(200).json({
      status: 'success',
      data: { updateOne },
   });
};
