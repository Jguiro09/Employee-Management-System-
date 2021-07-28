const db = require('./db');
const table = require('console.table');


// ? -------------------------------------------------------------------- VIEW FUNCTIONS ---------------------------------------------------------------------------------------
function viewDepartments(callback) {
    db.query(`SELECT *
    FROM department 
    ORDER BY id ASC;`, (err, result) => {
        if (err) throw err

        console.table(table.getTable(result));
        callback();
    })
}

function showDepartmentsBudget(callback) {
    db.query(`SELECT SUM(salary) AS Budget, department.name AS Department
    FROM company_db.role
    INNER JOIN department 
    ON role.department_id = department.id
    GROUP BY department_id;
    `, (err, results) => {
        if (err) throw err

        console.table(table.getTable(results));
        callback();
    })
}


// ? -------------------------------------------------------------------- UPDATE FUNCTIONS ---------------------------------------------------------------------------------------
function addDepartment(name, callback) {
    db.query(`INSERT INTO department (name) 
    VALUES 
    (?);`, [name], (err, results) => {
        if (err) throw err

        console.log("success!");
        callback();
    })
}

function deleteDepartment(name, callback) {

    db.query(`DELETE FROM department
    WHERE name = "${name}"`, (err, results) => {
        if (err) throw err

        console.log("success!");
        callback();
    })
}

module.exports = { viewDepartments, addDepartment, deleteDepartment, showDepartmentsBudget }