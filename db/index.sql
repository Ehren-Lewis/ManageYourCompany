USE company;

-- SELECT * FROM department;
-- SELECT * FROM roles;


SELECT * FROM employee;

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


-- DESCRIBE department;
-- DESCRIBE roles;
-- DESCRIBE employee;

