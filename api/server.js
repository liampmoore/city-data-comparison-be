const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/secrets');
const authenticate = require('../auth/requires-auth-middleware')


const authRouter = require('../auth/auth-router.js');


const server = express();




server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(passport.session());

server.use('/api/auth', authRouter);


module.exports = server;
