const express = require('express');
const tourController = require('./../controllers/GuideTourController');

const router = express.Router();

router.route('/cheap').get(tourController.topcheap, tourController.getallTours);

// router.route('/filter/cheap/:place').get(tourController.cheapByPlace);

router
   .route(`/:id`)
   .get(tourController.getTour)
   .patch(tourController.updateTour)
   .delete(tourController.deleteTour);

router.route('/filter/:place').get(tourController.placesSort);

router.route('/').get(tourController.getallTours).post(tourController.postTour);

module.exports = router;
