const express = require('express');
const tourController = require('./../controllers/GuideTourController');

const router = express.Router();

router.route('/').get(tourController.getallTours).post(tourController.postTour);

router.route('/cheap').get(tourController.topcheap, tourController.getallTours);

router
   .route(`/:id`)
   .get(tourController.getTour)
   .patch(tourController.updateTour)
   .delete(tourController.deleteTour);

module.exports = router;
