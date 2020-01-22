const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const keys = require('../config/secrets');
const cookieSession = require('cookie-session');
const multer = require('multer');


const authRouter = require('../auth/auth-router.js');
const userRouter = require('../users/user-router.js');

// storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const server = express();

server.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

//public folder
server.use(express.static('./public'));

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(passport.initialize());
server.use(passport.session());

server.use('/api/auth', authRouter);
server.use('/api/users', userRouter);




module.exports = server;
