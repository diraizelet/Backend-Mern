const express = require('express');
const mongoose = require('mongoose');
const bodyParser =require('body-parser');

const HttpError = require('./models/http-error');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const app = express();

app.use(bodyParser.json());

app.use( '/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find the specified link', 404);
    throw error;    
});

app.use((error, req, res, next) => {
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message ||'An unknown error occurred'});
});


mongoose.connect('mongodb+srv://raidi:Kakarot1@cluster0.gv6e8kk.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0')
.then(() =>
{
app.listen(5000);
console.log('db is connected');
}).catch(err => {
    console.log(err);
});