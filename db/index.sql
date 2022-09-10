USE company;

-- SELECT * FROM department;
-- SELECT * FROM roles;

-- SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles 
-- LEFT JOIN department
-- ON roles.department_id = department.id;

-- SELECT employee.id, employee.first_name, employee.last_name, manager.firstName as manager_name  FROM employee employees
-- JOIN employee manager ON employees.manager_id = manager.id;


SELECT
    Employees.Id,
        Employees.first_name,
        Employees.last_name,
        -- Employees.manager_id,
        Manager.first_name AS ManagerName,
        fullRoles.title
FROM employee Employees
LEFT JOIN employee Manager
ON Employees.manager_id = Manager.id
JOIN roles fullRoles ON fullRoles.id = Employees.role_id;

-- SELECT * FROM employee;

-- DESCRIBE department;


-- DESCRIBE employee;


-- CREATE TABLE IF NOT EXISTS department (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(30)
-- );

-- CREATE TABLE IF NOT EXISTS roles (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT,
--     FOREIGN KEY (department_id) 
--     REFERENCES department(id)
-- );

-- DESCRIBE roles;
-- CREATE TABLE IF NOT EXISTS employee (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role_id INT,
--     manager_id INT DEFAULT NULL, -- null if the employee has no manager
--     FOREIGN KEY (role_id)
--     REFERENCES roles(id)
-- );


-- JOIN role.derpartment_id ON department.id
-- JOIN 


-- DESCRIBE department;
-- DESCRIBE roles;
-- DESCRIBE employee;

