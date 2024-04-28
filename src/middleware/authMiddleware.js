'use strict';

// Imports
// libraries
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// project modules
const User = require('../models/User');
const dbUser = require('../../db/models/User');

function validateReqBody(req, res, next) {
    const { email, password } = req.body;

    try {
        User.validateEmail(email);
    } catch (err) {
        return res.status(400).send({ err });
    }

    try {
        User.validatePassword(password);
    } catch (err) {
        return res.status(400).send({ err });
    }

    next();
}

/**
 * Retrieves the user with the email specified in req.body. If no instance with that email exists in the
 * database, req.body.user is null.
 */
async function getUserFromDb(req, res, next) {
    const { email } = req.body;

    req.body.user = await dbUser.findUser(email);

    next();
}

function checkEmailExistenceInDb(req, res, next) {
    const found = req.body.user !== null;

    if (!found) return res.status(404).send({ err: 'User email not found.' });

    next();
}

function comparePasswords(req, res, next) {
    const { password } = req.body;
    const user = req.body.user;

    if (!bcrypt.compareSync(password, user.password))
        return res.status(401).send({ err: 'Incorrect password.' });

    next();
}

function authorize(req, res, next) {
    const token = req.get('x-token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY, {
            algorithm: 'HS256'
        });

        req._id = decoded._id;
        req.email = decoded.email;
    } catch (err) {
        return res.status(401).send({ err });
    }

    next();
}

module.exports = {
    validateReqBody,
    getUserFromDb,
    checkEmailExistenceInDb,
    comparePasswords,
    authorize
};
