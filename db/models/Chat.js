'use strict';

// Imports
// libraries

// project modules
const mongoose = require('../connection');

const chatSchema = mongoose.Schema({});

// Forum CRUD operations -----

const dbChat = mongoose.model('Chat', chatSchema);

module.exports = dbChat;
