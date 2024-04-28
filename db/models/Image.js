'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const imageSchema = mongoose.Schema({});

// Image CRUD operations -----

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
