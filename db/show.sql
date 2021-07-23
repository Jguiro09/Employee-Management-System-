-- Employees
SELECT first_name, last_name, title, department.name AS department, salary, manager_id 
FROM employee 
INNER JOIN role 
ON role.id = employee.role_id 
INNER JOIN department 
ON role.department_id = department.id;

-- Department
SELECT * FROM department;

-- Roles
SELECT role.id, role.title, name AS department, role.salary 
FROM role 
INNER JOIN department ON department.id = department_id;