const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Coopercooper12@',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
  );

  db.connect(function(err) {
    if (err) {
        throw err;
    }
  });

module.exports = db;