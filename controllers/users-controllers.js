const { v4: uuid } = require('uuid');


const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
            id: 'u1',
            name: 'Max vestappen',
            email: 'test@test.com',
            password: 'tested'
    }
];


const getUsers = (req, res, next) => {
    res.status(200).json({users: DUMMY_USERS});
};

const signup = (req, res, next) => {
    const {name, email, password} = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);

    if(hasUser) {
        throw new HttpError('User email already in use', 422);
    }


    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    };
    DUMMY_USERS.push(createdUser);
    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password} = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Could not find a user with given email or password', 401);
    }

    res.status(200).json({message: 'loggedin'});

};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;;