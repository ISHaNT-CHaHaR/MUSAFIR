const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const appErr = require('./../utils/appErr');

///////////////////////////////////     Register?????????///////////////////////
exports.register = catchAsync(async (req, res, next) => {
   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
   });

   const userSave = await user.save();

   res.status(201).json({
      status: 'success',
      data: userSave,
   });
});
////////////////////////////////// REGISTER????????????????????????????????????///////

//////////////////////////////     LOGIN  ////////////////////////////////////////
exports.login = catchAsync(async (req, res, next) => {
   res.status(201).json({
      status: 'success',
   });
});

/////////////////////////////// LOGIN ///////////////////////////////////////////

//////////////////////////////// get All users ////////////////////////////////

exports.getAllusers = catchAsync(async (req, res, next) => {
   const AllUsers = await User.find();
   res.status(201).json({
      status: 'success',
      Users: AllUsers,
   });
});
////////////////////////////////  get All Users //////////////////////////////////
