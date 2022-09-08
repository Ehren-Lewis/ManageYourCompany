
USE company;


-- CREATE TABLE IF NOT EXISTS department (
--     id INT PRIMARY KEY,
--     name VARCHAR(30)
-- );

-- CREATE TABLE IF NOT EXISTS roles (
--     id INT PRIMARY KEY,
--     title VARCHAR(30),
--     salary DECIMAL,
--     department_id INT,
--     FOREIGN KEY (department_id)
--     REFERENCES department(id)
-- );



-- CREATE TABLE IF NOT EXISTS employee (
--     id INT  PRIMARY KEY,
--     first_name VARCHAR(30),
--     last_name VARCHAR(30),
--     role_id INT,
--     manager_id INT DEFAULT NULL, -- null if the employee has no manager
--     FOREIGN KEY (role_id)
--     REFERENCES roles(id)
-- );


-- SELECT * FROM department;
-- SELECT * FROM roles;
-- SELECT * FROM employee;
