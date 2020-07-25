require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
  testing: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations",
      tableName: "dbmigrations",
    },
    seeds: { directory: "./database/seeds" },
  },
  staging: {
    client: "pg",
    connection: process.env.RDS_USERNAME,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },
};
