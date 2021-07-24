const db = require('./db');
const table = require ('console.table');
const inquirer = require('inquirer');

function viewEmployee() {
    db.query(`SELECT employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(e2.first_name, ', ', e2.last_name) AS manager
    FROM employee 
    INNER JOIN role 
    ON role.id = employee.role_id
    INNER JOIN department 
    ON role.department_id = department.id
	LEFT JOIN employee e2
    ON employee.manager_id = e2.id
    ORDER BY manager DESC;`, (err, result) => {
        if (err) throw err

        let test = table.getTable(result);
        return console.log(test);
    })
}

function addEmployee(fName, lName, role, manager){
    db.query(`INSERT INTO employee (first_name, last_name, role_id) 
    VALUES 
    ("${fName}", "${lName}", ${role});`)
}

function updateRole(roles)
{

    inquirer.prompt([
        {
            type: 'list',
            message: 'Which role would you like to update?',
            name: 'id',
            choices: roles
        }
    ])
    .then((response) => {
        db.query(`SELECT * FROM role WHERE title LIKE '%${response.id}%';`, (err, results) => {
            if (err) throw err
            console.log(results);
        })  
    })
    // db.query(`UPDATE employee
    //         SET role_id = ${role}
    //         WHERE id = ${id};`, (err, results) => {
    //             if (err) throw err
    //         })
}

function getLength()
{
    db.query(`SELECT * FROM employee;`, (err, results) => {
        if (err) throw err
        console.log(results.length)
    })

    db.query(`SELECT * FROM employee;`, (err, results) => {
        if (err) throw err
        console.log(results[8])
    })
}

module.exports = {viewEmployee, addEmployee, getLength};
