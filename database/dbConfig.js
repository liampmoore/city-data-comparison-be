const knex = require('knex');

const knexConfig = require('../knexfile.js');
const dbEnv = 'development';

module.exports = knex(knexConfig[dbEnv]);
