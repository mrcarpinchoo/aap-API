'use strict';

// Imports
// libraries

// project modules
const User = require('../models/User');
const dbUser = require('../../db/models/User');

function validateReqBody(req, res, next) {
    const { name, email, password } = req.body;

    try {
        User.validateName(name);
    } catch (err) {
        return res.status(400).send({ err });
    }

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

async function checkEmailExistenceInDb(req, res, next) {
    const { email } = req.body;

    const found = (await dbUser.findUser(email)) !== null;

    if (found) return res.status(409).send({ error: 'User already exists.' });

    next();
}

module.exports = { validateReqBody, checkEmailExistenceInDb };
