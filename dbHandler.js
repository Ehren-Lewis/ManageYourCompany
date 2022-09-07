



const viewEmployeesByMngr = (db, managerID) => {
    db.query(`
    SELECT first_name, last_name 
    FROM employees
    WHERE manager_id=${managerID}`);
}

const viewEmployeesByDept = (db, deptID) => {
    db.query(`
    SELECT first_name, last_name 
    FROM employees
    WHERE role_id=${deptID}`);
}


const deleteItem =  (db, itemToDelete) => {

}
