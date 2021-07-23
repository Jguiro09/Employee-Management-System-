const db = require('./db');
const table = require ('console.table');

function viewEmployee() {
    return db.query(`SELECT first_name, last_name, title, department.name AS department, salary, manager_id 
    FROM employee 
    INNER JOIN role 
    ON role.id = employee.role_id 
    INNER JOIN department 
    ON role.department_id = department.id;`, (err, result) => {
        if (err) throw err

        let test = table.getTable(result);
        return console.log(test);
    })
}

function addEmployee(fName, lName, role){
    return db.query(`INSERT INTO employee (first_name, last_name, role_id) 
    VALUES 
    ("${fName}", "${lName}", ${role});`)
}

function getLength()
{
    db.query(`SELECT * FROM employee;`, (err, results) => {
        if (err) throw err
        console.log(results.length)
    })
}


module.exports = {viewEmployee, addEmployee, getLength};
