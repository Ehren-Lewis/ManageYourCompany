const inquirer = require("inquirer");
const mysql = require("mysql2")
const consoleTable = require("console.table");




const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company'
  },
  console.log(`Connected to the company database.`)
);

db.query('SELECT * FROM students', function (err, results) {
    console.log(results);
  });
  