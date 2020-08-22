const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appErr = require('./../utils/appErr');

exports.register = catchAsync(async (req, res, next) => {
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });

   res.status(201).json({
      status: 'success',
   });
});

exports.login = catchAsync(async (req, res, next) => {
   res.status(201).json({
      status: 'success',
   });
});
