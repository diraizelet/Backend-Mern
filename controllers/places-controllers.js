const { v4: uuid } = require('uuid');
const { validationResult } =require('express-validator');

const getCoordsForAddress = require('../util/location');
const HttpError = require('../models/http-error');



let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'empire state ',
        description: 'famous skyscraper',
        location: 
        {
            lat: 40.7484474,
            lng: -73.9871516    
        },
        address: '21 w someting ting',
        creator: 'u1'
    }
];

const getPlaceById = (req, res, next) => {

    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId ;
    });

    if(!place){
        throw  new HttpError('could not  find a place with pid ', 404 );
    }

    console.log('Get request in place');
    res.json({place}); //   => {place} => {place: place} to find the place that is similar to searched placeId
};




const getPlacesByUserId = (req, res, next) => {

    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId ;
    });


    if(!places || places.length === 0){
        throw new Error('could not  find  places that is made by that user', 404);
        // to find and provide all the users palces that are made 
    }


    console.log('Get request in place');
    res.json({places});
}

const createPlace = async (req, res ,next) => {
    const errors = validationResult(req);


    if(!errors.isEmpty()) {
        console.log(errors);
        res.status(422);
        next( new HttpError('Invalid input, chech the data', 422));
    }
    const {title, description,  address, creator} = req.body;
    let coordinates;
    try{
         coordinates = await getCoordsForAddress(address);    
    }
    catch(error){
        return next(error);
    }
    const createdPlace = {
        id: uuid(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };
    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place: createdPlace});
};


const updatePlacesById = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors);
        res.status(422);
        throw new HttpError('Invalid data please check.', 422);
    }
    const { title , description } =req.body;
    const placeId = req.params.pid;


    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)};
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};


const deletePlacesById = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find the place with that id', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({message: 'deleted place.', });

};

exports.getPlaceById = getPlaceById; 
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlacesById = updatePlacesById;
exports.deletePlacesById = deletePlacesById;
