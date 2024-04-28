'use strict';

// Import
// libraries
const dotenv = require('dotenv');
const express = require('express');

// project modules
const authRouter = require('./router/authRouter');
const chatRouter = require('./router/chatRouter');
const imageRouter = require('./router/imageRouter');
const petRouter = require('./router/petRouter');
const userRouter = require('./router/userRouter');
const wishlistRouter = require('./router/wishlistRouter');

dotenv.config(); // loads .env file contents into process.env

// socket
const PORT = process.env.PORT || 4000;

const app = express(); // express application

// global middleware
app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);
app.use('/api/images', imageRouter);
app.use('/api/pets', petRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlists', wishlistRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
