const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new Mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         max: 30,
      },
      email: {
         type: String,
         required: true,
         max: 100,
         unique: true,
         lowercase: true,
         validate: [validator.isEmail, 'Please enter a valid Email'],
      },
      password: {
         type: String,
         required: true,
         minlength: 8,
      },
      passwordConfirm: {
         type: String,
         required: true,
         validate: {
            validator: function (el) {
               return el === this.password;
            },
            message: 'Passwords are not same!',
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

userSchema.pre('save', function (next) {
   this.password = crypto
      .createHash('sha256')
      .update(this.password)
      .digest('hex');

   this.passwordConfirm = crypto
      .createHash('sha256')
      .update(this.passwordConfirm)
      .digest('hex');
   next();
});

const User = Mongoose.model('userSchema', userSchema);

module.exports = User;
