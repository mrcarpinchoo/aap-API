'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const imageSchema = mongoose.Schema({});

// Image CRUD operations -----

const dbImage = mongoose.model('Image', imageSchema);

module.exports = dbImage;
