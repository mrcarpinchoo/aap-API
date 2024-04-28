'use strict';

// Imports
// libraries
const express = require('express');
const { authorize } = require('../middleware/authMiddleware');

// project modules
const dbWishlist = require('../../db/models/Wishlist');

const router = express.Router();

// GET requests
// retrieves user wishlist
router.get('/my-wishlist', authorize, (req, res) => {
    return res.status(200).send({ _id: req._id, email: req.email });

    // const wishlist = await dbWishlist.getWishlist();
});

module.exports = router;
