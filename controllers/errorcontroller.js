const appErr = require('./../utils/appErr');

const sendErrorDev = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const sendErrorProd = (err, res) => {
   if (err.isOperational) {
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   } else {
      console.log('Error', err);

      res.status(500).json({
         status: 'error',
         message: 'Something went Wrong!',
      });
   }
};

////////////////////////////////For Invalid IDS////////////////////////////////////////////

const handleCastError = (error) => {
   const message = `Invalid ${error.path}: ${error.value}`;
   return new appErr(message, 404);
};

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === 'production') {
      let error = { ...err };

      if (error.name === 'CastError') {
         error = handleCastError(error);
      }
      sendErrorProd(error, res);
   }
};
