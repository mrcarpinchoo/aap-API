'use strict';

// Imports
// libraries
const express = require('express');
const jwt = require('jsonwebtoken');

// project modules
const {
    validateReqBody,
    getUserFromDb,
    checkEmailExistenceInDb,
    comparePasswords
} = require('../middleware/authMiddleware');

const router = express.Router();

// POST requests
// authenticates user
router.post(
    '/login',
    validateReqBody,
    getUserFromDb,
    checkEmailExistenceInDb,
    comparePasswords,
    (req, res) => {
        const user = req.body.user; // req.body.user is declared in the getUser middleware function

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_PRIVATE_KEY,
            { algorithm: 'HS256', expiresIn: '1h' }
        );

        return res.status(200).send({ token });
    }
);

module.exports = router;
