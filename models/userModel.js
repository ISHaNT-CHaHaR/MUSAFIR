const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');
const { string } = require('joi');

const userSchema = new Mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please tell your email'],
         max: 30,
      },
      email: {
         type: String,
         required: [true, 'Please provide your Email!'],
         max: 100,
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, 'Please enter a valid Email'],
      },
      role: {
         type: String,
         enum: ['admin', 'guide', 'user'],
         default: 'user',
      },
      password: {
         type: String,
         required: true,
         minlength: 8,
         select: false,
      },
      passwordConfirm: {
         type: String,
         required: true,
         validate: {
            validator: function (el) {
               return el === this.password;
            },
         },
         select: false,
      },
      photo: String,
      date: {
         type: Date,
         default: Date.now,
      },
   }
   // {
   //    toJSON: { virtuals: true },
   // }
);

// userSchema.pre('save', function (next) {
//    this.password = crypto
//       .createHash('sha256')
//       .update(this.password)
//       .digest('hex');

//    this.passwordConfirm = crypto
//       .createHash('sha256')
//       .update(this.passwordConfirm)
//       .digest('hex');
//    next();
// });

userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next(); // if password was actually modified.
   this.password = await bcrypt.hash(this.password, 11);
   this.passwordConfirm = undefined;
   next();
});

userSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword);
};

const User = Mongoose.model('userSchema', userSchema);

module.exports = User;
