const express = require('express');
const tourController = require('./../controllers/GuideTourController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.route('/cheap').get(tourController.topcheap, tourController.getallTours);

// router.route('/filter/cheap/:place').get(tourController.cheapByPlace);

router
   .route(`/:id`)
   .get(tourController.getTour)
   .patch(tourController.updateTour)
   .delete(
      userController.protect,
      userController.restrictTo('admin'),
      tourController.deleteTour
   );

router.route('/filter/:place').get(tourController.placesSort);

router
   .route('/')
   .get(userController.protect, tourController.getallTours)
   .post(tourController.postTour);

module.exports = router;
