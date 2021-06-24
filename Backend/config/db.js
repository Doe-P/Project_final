// import mysql 
const mysql = require('mysql');

//import dotenv for use file .env
require('dotenv').config();

// Create connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Open the connection
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected...');
});

module.exports = connection;