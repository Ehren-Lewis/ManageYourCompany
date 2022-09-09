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
                "name":"roleSalary",
                "message": "What salary of the role?",
                "type":"number"
            },
            {
                "name":"roleDepartment",
                "message": "What department doese this role belong to?",
                "type":"input"
        }

        ]
    ).then( ( answer ) => {

        // var desiredDept = "";
        // var desiredDeptNumb = "";

        // // db.promise().query("SELECT * FROM department").then( (res) => {
        // //     const queryRes = res[0];
        // //     for (let i = 0; i < queryRes.length; i++) {
        // //         if (queryRes[i].name.toLowerCase() == answer.roleDepartment.toLowerCase()) { 
        // //             console.log("Department found!");
        // //             desiredDept = queryRes[i].name;
        // //         }
        // //     }

        //     // if (desiredDept == "") {
        //     //     console.log("Department couldn't be found");
        //     //     return;
        //     // }
        // })
        db.promise().query(`SELECT * FROM department WHERE name="${answer.roleDepartment}"`).then( (res) => {

           const result = res[0];

           return [answer, result];

       
           
        
        }).then( (ans) => {
            db.promise().query(`INSERT INTO roles (title, salary, department_id)
            VALUES ("${ans[0].roleTitle}", ${ans[0].roleSalary}, ${ans[1][0].id});`);
            console.log("Success");
        })
    }
    )
        // process.exit(0);
}


const addEmployee = () => {

    const addNewEmployee = inquirer.createPromptModule();

    const name = db.promise().query("SELECT title FROM roles").then( (res) => {
        // console.log(res[0]);
        // const newArr = [for (x of res[0]) x.title];
        let x = res[0].map(ele => ele.title);
        return x;
    }).then( ans1 => {
        db.promise().query("SELECT first_name FROM employee WHERE manager_id IS NULL").then (res => {
            let managers= res[0].map(ele => ele.first_name);
            return [ans1, managers];
        }).then( ans => {
    addNewEmployee(
        [
            {
                "name":"employeeFName",
                "message": "What is the first name of the new employee?",
                "type": "input"
            },
            {
                "name":"employeeLName",
                "message": "What is the last name of the new employee?",
                "type":"input"
            },
            {
                "name":"employeeRole",
                "message": "What role does this employee belong to?",
                "type":"list",
                choices: ans[0]
            },
            {
                "name":"employeeManager",
                "message": "What manager does this employee belong to?",
                "type":"list",
                "choices":[...ans[1], "NULL"]
            }

        ]
    ).then( ( answer ) => {
        db.promise().query(`SELECT id FROM roles WHERE title="${answer.employeeRole}"`).then( (res) => {
            return [res[0][0].id, answer.employeeManager, answer.employeeFName, answer.employeeLName];
        }).then( (ans) => {
            db.promise().query(`SELECT id FROM employee WHERE first_name="${ans[1]}"`).then( (res) => {

                if (res[0][0] == undefined) {
                    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES("${ans[2]}", "${ans[3]}", ${ans[0]}, NULL);`);
                } else {
                    db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${ans[2]}", "${ans[3]}", ${ans[0]}, ${res[0][0].id} );`);
                }
                console.log('added successfully!')
            })
        }
        )
    }
    )})
})
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

