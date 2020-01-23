const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/secrets');
const cookieSession = require('cookie-session');



const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');
const preferenceRouter = require('../preferences/preference-router.js');



const server = express();

server.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))




server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(passport.session());

// server.use('/uploads', express.static('uploads'));
server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);
server.use('/api/preferences', preferenceRouter)



module.exports = server;
