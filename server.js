const inquirer = require("inquirer");
const mysql = require("mysql2")
const consoleTable = require("console.table");
// const sequelize = require("./config/connection.js");



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
        console.table(results);
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

// viewRoles();

const asyncQuery = async () => {

const data = await db.execute('SELECT * FROM roles;');
console.log(data);
return data;

}

// const res =  asyncQuery();
// console.log(res);


const addDepartment = () => {
    const addNewDepartment = inquirer.createPromptModule();

    addNewDepartment(
        [
            {
                "name":"departmentTitle",
                "message": "What is the name of the new department?",
                "type": "input"
            }
        ]
    ).then( (answer ) => {
        // db.query(`INSERT INTO department (name)
        //         VALUES ("${answer.departmentTitle}");`);
        // viewDeparments();

        db.promise().query("SELECT * FROM department").then( (res) => {
            // console.log(res[0]);
            const queryRes = res[0];
            for (let i = 0; i < queryRes.length; i++) {
                if (answer.departmentTitle.toLowerCase() == queryRes[i].name.toLowerCase()) {
                    console.log("This department has already been added");

                    // Run home menu

                    return;
                }          
            }
        console.log("Adding the department!");  
        
        db.query(`INSERT INTO department(name) VALUES ("${answer.departmentTitle}")`);

            // Run home menu

        })
    });
}

const addRole = () => {

    const addNewRole = inquirer.createPromptModule();

    addNewRole(
        [
            {
                "name":"roleTitle",
                "message": "What is the name of the new role?",
                "type": "input"
            },
            {
                "name":"roleSalaray",
                "message": "What salary of the role?",
                "type":"number"
            },
            {
                "name":"roleDepartment",
                "message": "What department doese this role belong to?",
                "type":"input"
        }

        ]
    ).then( (answer ) => {

        var desiredDept = "";
        var desiredDeptNumb = "";

        db.promise().query("SELECT * FROM department").then( (res) => {
            const queryRes = res[0];
            for (let i = 0; i < queryRes.length; i++) {
                if (queryRes[i].name.toLowerCase() == answer.roleDepartment.toLowerCase()) { 
                    console.log("Department found!");
                    desiredDept = queryRes[i].name;
                }
            }

            // if (desiredDept == "") {
            //     console.log("Department couldn't be found");
            //     return;
            // }
        }).then (
            db.promise().query("SELECT * FROM roles").then( (res) => {
                console.log(desiredDept);
                // console.log(res[0]);
                const queryRes = res[0];
                for (let i = 0; i < queryRes.length; i++) {
                    if (answer.roleTitle.toLowerCase() == queryRes[i].title.toLowerCase()) {
                        // console.log("This roles has already been added");
                        // Run home menu
                        return;
                    }          
                }
            console.log("Adding the role!");  
            
            // db.query(`INSERT INTO role (name) VALUES ("${answer.roleTitle}")`);
    
                // Run home menu
    
            }))
        });
        
    }
 
        // process.exit(0);




addRole();

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



