const mysql = require('mysql2/promise');

require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

async function getConnection() {
    return mysql.createConnection(dbConfig);
}

module.exports = { getConnection };
