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
      length: AllUsers.length,
      Users: AllUsers,
   });
});
////////////////////////////////  get All Users //////////////////////////////////

//////////////////////////////// Update User ////////////////////////////////////////
exports.updateUser = catchAsync(async (req, res, next) => {
   const Id = req.params.id;
   const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
   });
   if (!User) {
      return next(new appErr('invalid ID!', 404));
   }
   res.status(200).json({
      status: 'success',
      data: { user },
   });
});
//////////////////////////////////// Update User /////////////////////////////////////

////////////////////////////////delete Tour ////////////////////////////////

exports.deleteUser = catchAsync(async (req, res, next) => {
   const user = await User.findById(req.params.id);
   if (user) {
      await User.findByIdAndDelete(req.params.id);

      res.status(202).json({
         status: 'success',
         data: null,
      });
   } else {
      return next(new appErr('Not a valid ID', 404));
   }
   next();
});

/////////////////////////////// delete Tour ///////////////////////////////
