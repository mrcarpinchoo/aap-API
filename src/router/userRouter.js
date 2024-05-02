'use strict';

// Imports
// libraries
const express = require('express');
const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');

// project modules
const { authorize } = require('../middleware/userMiddleware');
const {
    validateReqBody,
    checkEmailExistence,
    createWishlist
} = require('../middleware/userMiddleware');
const dbPet = require('../../db/models/Pet');
const dbUser = require('../../db/models/User');
const dbWishlist = require('../../db/models/Wishlist');

const NANOID_SIZE = 10;

const router = express.Router();

// POST requests
// registers a new user
router.post(
    '/',
    validateReqBody,
    checkEmailExistence,
    createWishlist,
    async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const user = await dbUser.createUser({
                uuid: nanoid(NANOID_SIZE),
                name,
                email,
                password,
                wishlistID: req.wishlistID
            });

            return res.status(201).send(user);
        } catch (err) {
            return res.status(500).send({ err: err.message });
        }
    }
);

// PUT requests
router.put('/', authorize, validateReqBody, async (req, res) => {
    const { name, email, password } = req.body;

    if (email !== req.user.email) {
        const found = (await dbUser.getUserByEmail(email)) !== null;

        if (found) return res.status(409).send({ err: 'Email already exists' });
    }

    try {
        const {
            _id,
            uuid,
            email: newEmail
        } = await dbUser.updateUser(req.user._id, {
            name,
            email,
            password
        });

        const token = jwt.sign(
            { _id, uuid, email: newEmail },
            process.env.JWT_PRIVATE_KEY,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        );

        return res.status(200).send({ token });
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }
});

// DELETE requests
router.delete('/', authorize, async (req, res) => {
    try {
        const { wishlistID } = await dbUser.getUserByID(req.user._id);

        req.user.wishlistID = wishlistID;
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    try {
        await dbWishlist.deleteWishlist(req.user.wishlistID);
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    try {
        await dbPet.deletePetsOnUserDeletion(req.user.email);
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }

    try {
        const deletedUser = await dbUser.deleteUser(req.user._id);

        return res.status(200).send(deletedUser);
    } catch (err) {
        return res.status(500).send({ err: err.message });
    }
});

module.exports = router;
