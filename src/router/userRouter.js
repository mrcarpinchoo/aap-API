'use strict';

// Imports
// libraries
const express = require('express');
const { nanoid } = require('nanoid');

// project modules
const {
    validateReqBody,
    checkEmailExistenceInDb
} = require('../middleware/userMiddleware');
const dbUser = require('../../db/models/User');

const NANOID_SIZE = 10;

const router = express.Router();

// POST requests
// registers a new user
router.post('/', validateReqBody, checkEmailExistenceInDb, async (req, res) => {
    const { name, email, password } = req.body;

    const userData = {
        uuid: nanoid(NANOID_SIZE),
        name,
        email,
        password
    };

    const user = await dbUser.createUser(userData);

    return res.status(201).send(user);
});

module.exports = router;
