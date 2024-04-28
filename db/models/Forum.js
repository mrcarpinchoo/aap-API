'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../../db/connection');

const forumSchema = mongoose.Schema({});

// Forum CRUD operations -----

const dbUserForum = mongoose.model('Forum', forumSchema);

module.exports = dbUserForum;
