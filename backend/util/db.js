const dotenv = require('dotenv').config()
const mysql  = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    waitForConnections: true,
    connectionLimit: 10,
})

module.exports = pool.promise()