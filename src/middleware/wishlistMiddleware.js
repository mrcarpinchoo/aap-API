'use strict';

// Imports
// libraries
const jwt = require('jsonwebtoken');

// project modules
const dbUser = require('../../db/models/User');
const dbPet = require('../../db/models/Pet');
const dbWishlist = require('../../db/models/Wishlist');

function authorize(req, res, next) {
    const token = req.get('x-token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, {
            algorithm: 'HS256'
        });

        req.user = { _id: decoded._id, uuid: decoded.uuid };
    } catch (err) {
        return res.status(401).send({ err: err.message });
    }

    next();
}

async function getWishlistByID(req, res, next) {
    try {
        const { wishlistID } = await dbUser.getUserByID(req.user._id);
        const wishlist = await dbWishlist.getWishlistByID(wishlistID);

        req.wishlist = wishlist;
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    next();
}

async function getPetIDByUUID(req, res, next) {
    const petUUID = req.params.petUUID;

    try {
        const { _id } = await dbPet.getPetByUUID(petUUID);

        req.pet = { _id };
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    next();
}

async function checkExistenceInWishlist(req, res, next) {
    const { _id } = req.wishlist;
    const petID = req.pet._id;

    try {
        req.isPetInWishlist =
            (await dbWishlist.getWishlist({ _id, pets: petID })) !== null;
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    next();
}

module.exports = {
    authorize,
    getWishlistByID,
    getPetIDByUUID,
    checkExistenceInWishlist
};
