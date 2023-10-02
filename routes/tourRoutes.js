const express = require('express');
const tourController = require('../controllers/tourController'); //this will have access to all the functions that were exported using the dot operator

const router = express.Router();

//param middleware -  This will only run if we have id in the specified route
//router.param('id', tourController.checkID);//to check if the id is valid

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
