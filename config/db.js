const mysql = require('mysql2/promise');
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME; 

const pool = mysql.createPool({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName
});

module.exports = pool;
