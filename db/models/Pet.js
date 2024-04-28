'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const petSchema = mongoose.Schema({});

// Pet CRUD operations -----

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
