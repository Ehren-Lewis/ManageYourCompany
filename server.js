const inquirer = require("inquirer");
const mysql = require("mysql2")
const consoleTable = require("console.table");
const sequelize = require("./config/connection.js");



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


const viewDeparments = () => {
    db.query('SELECT * FROM department;', function (err, results) {
        console.log(results);
      });
      
}


const viewRoles = () => {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
      });
      
}

const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
      });
      
}

const addDepartment = () => {
    const addNewDepartment = inquirer.createPromptModule();

}

const addEmployee = () => {

}

const updateEmployee = () => {

}

const mainMenu = () => {
    const menuPrompt = inquirer.createPromptModule();

    menuPrompt([
        {

        }
    ])
}


const startPrompt = inquirer.createPromptModule();



