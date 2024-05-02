'use strict';

// Import
// libraries
const dotenv = require('dotenv');
const express = require('express');

// project modules
const authRouter = require('./router/authRouter');
const imageRouter = require('./router/imageRouter');
const petRouter = require('./router/petRouter');
const userRouter = require('./router/userRouter');
const wishlistRouter = require('./router/wishlistRouter');
const messageRouter = require('./router/messageRouter');
const requestRouter = require('./router/requestRouter');

dotenv.config(); // loads .env file contents into process.env

// socket
const PORT = process.env.PORT || 4000;

const app = express(); // express application

// global middleware
app.use(express.json());

// routes
app.use('/api/auth', authRouter);
app.use('/api/images', imageRouter);
app.use('/api/pets', petRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlists', wishlistRouter);
app.use('/api/messages', messageRouter);
app.use('/api/requests', requestRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
