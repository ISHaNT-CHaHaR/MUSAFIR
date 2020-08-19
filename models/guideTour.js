const mongoose = require('mongoose');
const slugify = require('slugify');

const guideTourSchema = new mongoose.Schema({
   place: {
      type: String,
      trim: true,
      required: [true, 'A place must be given'],
   },

   provider: {
      type: String,
      trim: true,
      required: [true, 'Provider must have a registered Name'],
   },
   duration: {
      type: Number,
      required: [true, 'Tour must have a duration'],
   },
   price: {
      type: Number,

      required: [true, 'Tour must have a price'],
   },
   summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a summary'],
   },
});

guideTourSchema.pre('save', function (next) {
   this.place = this.place.toLowerCase();
   next();
});

const guideTour = mongoose.model('guideTour', guideTourSchema);

module.exports = guideTour;
