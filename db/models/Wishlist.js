'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const wishlistSchema = mongoose.Schema({});

// Wishlist CRUD operations -----

const dbWishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = dbWishlist;
