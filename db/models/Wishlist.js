'use strict';

// Imports
// project modules
const mongoose = require('../connection');

// wishlist schema
const wishlistSchema = mongoose.Schema({
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    pets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Pet',
            default: []
        }
    ]
});

// Wishlist CRUD operations -----
// create
wishlistSchema.statics.createWishlist = async wishlistData => {
    try {
        return await dbWishlist(wishlistData).save();
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

// read
/**
 * Returns the wishlist of the user.
 * @param {string} ID ID of the user in the database.
 * @returns {object} Whishlist instance.
 */
wishlistSchema.statics.getWishlistByID = async id => {
    try {
        return await dbWishlist.findById(id);
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

wishlistSchema.statics.getWishlist = async filter => {
    try {
        return await dbWishlist.findOne(filter);
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

// update
wishlistSchema.statics.addPetToWishlist = async (wishlistID, petID) => {
    try {
        return await dbWishlist.findByIdAndUpdate(
            wishlistID,
            { $push: { pets: petID } },
            { new: true }
        ); // returns the updated wishlist object
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

wishlistSchema.statics.removePetFromWishlist = async (wishlistID, petID) => {
    try {
        return await dbWishlist.findByIdAndUpdate(
            wishlistID,
            { $pull: { pets: petID } },
            { new: true }
        ); // returns the updated wishlist object
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

// delete
wishlistSchema.statics.deleteWishlist = async id => {
    try {
        return await dbWishlist.findByIdAndDelete(id);
    } catch (err) {
        throw new Error(`Database server error: ${err}`);
    }
};

const dbWishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = dbWishlist;
