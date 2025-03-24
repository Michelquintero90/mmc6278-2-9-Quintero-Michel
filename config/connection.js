const mysql = require('mysql2');
require('dotenv').config(); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME || ''
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');

  connection.query('SELECT DATABASE() AS db', (err, results) => {
    if (err) {
        console.error('Error getting active database:', err);
        return;
    }
    console.log('Active database:', results[0].db);
  });
});

module.exports = connection;
