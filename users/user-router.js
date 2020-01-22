const router = require('express').Router();
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets');
const passport = require('passport');
const validator = require('password-validator')
const Users = require('../auth/auth-model');