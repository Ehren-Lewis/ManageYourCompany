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

const viewEmployeesByDept = (deptID) => {
    db.query(`
    SELECT first_name, last_name 
    FROM employee
    WHERE role_id=${deptID}`, function (err, results) {
        console.table(results);
    });

}

// doesn't work 
// const launchEmpView = () => {
//     const empViewPrompt = inquirer.createPromptModule();

//     db.promise().query("SELECT * FROM department").then (res => {
//         let departments= res[0].map(ele => ele.name);
//         return departments;
//     }).then( (depts) => {
//         empViewPrompt([
//             {
//             "name":"employeeDepartment",
//             "message": "What department would you like to view employees by?",
//             "type":"list",
//             "choices": depts
//             }
//         ]).then( (answer) => {
//             db.promise().query(`SELECT id FROM department WHERE name="${answer.employeeDepartment}"`).then( (res) => {
//             // .then( (res ) => {
//             //     db.query(`SELECT first_name last_name FROM employee WHERE manager_id=${res[0][0].id}`, (err, results) => {
//             //         console.table(results);
//             //     })
//             // })
//             console.log(res[0]);
//             return res[0];
//         }).then((answer) => {
//             db.promise().query(`SELECT id FROM roles WHERE department_id="${answer[0].id}"`).then( (res ) => {
//                 console.log(res[0]);
//             })
//         })
//     })
// })
// }

      // db.query(`SELECT first_name last_name FROM employee WHERE (SELECT id FROM roles WHERE department_id="${answer.employeeDepartment})`, (err, results) => {
        //     console.table(results);
        //     })
        // })
// launchEmpView();

const launchMngrView = () => {
    const mngrViewPrompt = inquirer.createPromptModule();

    db.promise().query("SELECT first_name FROM employee WHERE manager_id IS NULL").then (res => {
        let managers= res[0].map(ele => ele.first_name);
        return managers;
    }).then( (managers) => {
        mngrViewPrompt([
            {
            "name":"employeeManager",
            "message": "What manager would you like to view employees by?",
            "type":"list",
            "choices": managers
            }
        ]).then( (answer) => {
            db.promise().query(`SELECT id FROM employee WHERE first_name="${answer.employeeManager}"`).then( (res ) => {
                db.query(`SELECT first_name last_name FROM employee WHERE manager_id=${res[0][0].id}`, (err, results) => {
                    console.table(results);
                })
            })
        })
    })

    ;
    
}

// works 
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

        mainMenu();

            // Run home menu

        })
    });
    ;

}
// works
const addRole = () => {

    const addNewRole = inquirer.createPromptModule();

    db.promise().query('SELECT * FROM department').then( (res) => {
        const depts = res[0].map(ele => ele.name);
        return depts
    }).then( (depts) => {

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
                "message": "What department does this role belong to?",
                "type":"list",
                "choices": depts
        }

        ]).then( ( answer ) => {
        db.promise().query(`SELECT * FROM department WHERE name="${answer.roleDepartment}"`).then( (res) => {

           const result = res[0];

           return [answer, result];           
        
        }).then( (ans) => {
            db.promise().query(`INSERT INTO roles (title, salary, department_id)
            VALUES ("${ans[0].roleTitle}", ${ans[0].roleSalary}, ${ans[1][0].id});`);
            console.log("Success");
            mainMenu();
        })
    }
    )
        // process.exit(0);
        ;
})
}

// works 
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
                mainMenu();
            })
        }
        )
    }
    )})
});

}


// works 
const updateEmployee = () => {

    db.promise().query("SELECT title FROM roles").then( (res) => {
        // console.log(res[0]);
        // const newArr = [for (x of res[0]) x.title];
        let x = res[0].map(ele => ele.title);
        return x;
    }).then( ans1 => {

        db.promise().query("SELECT first_name FROM employee").then( (res) => {
            let people = res[0].map(ele => ele.first_name);
            return [ans1, people];
        }).then( (answers) => {
            
            const updateEmployee = inquirer.createPromptModule();

            updateEmployee([
                {
                    "name":"employeeName",
                    "message": "What is the first name of the employee you would like to update?",
                    "type":"list",
                    choices: answers[1]
                },
                {
                    "name":"employeeRole",
                    "message": "What is the new role of the employee?",
                    "type":"list",
                    "choices":answers[0]
                }
            ]).then( (results ) => {
                db.promise().query(`SELECT id FROM roles WHERE title="${results.employeeRole}"`).then( (res) => {
                    db.promise().query(`UPDATE employee SET role_id = ${res[0][0].id} WHERE first_name="${results.employeeName}";`);
                    console.log("Updated successfully");
                    mainMenu();
                })
            })

        })

    })


}



const mainMenu = () => {
    const menuPrompt = inquirer.createPromptModule();

    menuPrompt([
        {
            "name":"choice",
            "message": "What would you like to do?",
            "type":"list",
            "choices":["View departments", "View roles", "View employees", 
        "Add department", "Add role", "Add employee", "Update employee", "Quit"]

        }
    ]).then( (answer) => {
        switch (answer.choice){

            case "View departments":
                viewDeparments();
            break;
            case "View roles":
                viewRoles();
            break;
            case "View employees":
                viewEmployees();
            break;
            case "Add department":
                addDepartment();
            break;
            case "Add role":
                addRole();
            break;
            case "Add employee":
                addEmployee();
            break;
            case "Update employee":
                updateEmployee();      
            break;
            case "Quit":

            break;
        }
       
    })
}

mainMenu();

// const startPrompt = inquirer.createPromptModule();

;

