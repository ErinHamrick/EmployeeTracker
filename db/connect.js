require('dotenv').config();
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PW,
        database: process.env.DB_NAME
      });



module.exports = db