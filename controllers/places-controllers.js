const { v4: uuid } = require('uuid');


const HttpError = require('../models/http-error');



const DUMMY_PLACES = [
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
        throw  new HttpError('could not  find a place with uid ', 404 );
    }

    console.log('Get request in place');
    res.json({place}); //   => {place} => {place: place} to find the place that is similar to searched placeId
};




getPlaceByUserId = (req, res, next) => {

    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId ;
    });


    if(!place){
        throw new Error('could not  find a place that is made by that user', 404);
        // to find and provide all the users palces that are made 
    }


    console.log('Get request in place');
    res.json({place});
}

const createPlace = (req, res ,next) => {
    const {title, description, coordinates, address, creator} = req.body;
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
    
};

exports.getPlaceById = getPlaceById; 
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.updatePlacesById = updatePlacesById;
exports.deletePlacesById = deletePlacesById;
