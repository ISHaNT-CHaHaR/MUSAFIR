const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');

const userSchema = new Mongoose.Schema({
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
      select: false,
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
   },
   photo: String,
   date: {
      type: Date,
      default: Date.now,
   },
});

const User = mongoose.model('userSchema');

module.exports = User;
