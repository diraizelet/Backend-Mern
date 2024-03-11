const express = require('express');

const PlacesController = require('../controllers/places-controllers');

const router = express.Router();




router.get('/:pid', PlacesController.getPlaceById);


router.get('/user/:uid', PlacesController.getPlaceByUserId);

router.post('/', PlacesController.createPlace);

router.patch('/:pid', PlacesController.updatePlacesById);

router.delete('/:pid', PlacesController.deletePlacesById);

module.exports = router;