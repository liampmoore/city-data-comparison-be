const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/secrets');
const authenticate = require('../auth/requires-auth-middleware')



const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');
const preferenceRouter = require('../preferences/preference-router.js');



const server = express();



 
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(passport.initialize());


// server.use('/uploads', express.static('uploads'));
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/preferences', preferenceRouter)



module.exports = server;
