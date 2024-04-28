'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const wishlistSchema = mongoose.Schema({});

// Wishlist CRUD operations -----

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
