'use strict';

// Imports
// libraries
const bcrypt = require('bcryptjs');

// project modules
const mongoose = require('../connection');

// user schema
const userSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

/*
images: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        default: []
    }
]
*/

// User CRUD operations -----
// create
userSchema.statics.createUser = async userData => {
    const hash = bcrypt.hashSync(userData.password);

    userData.password = hash;

    return await dbUser(userData).save();
};

// read
userSchema.statics.findUser = async email => {
    return await dbUser.findOne({ email });
};

const dbUser = mongoose.model('User', userSchema);

/*
dbUser.createUser({
    uuid: 1234,
    email: 'guillermo.romero@iteso.mx',
    password: 'pass',
    name: 'Guillermo'
});
*/

module.exports = dbUser;
