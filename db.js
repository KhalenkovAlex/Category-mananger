const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);
