const db = require('./db');
const table = require('console.table');
const tableData = require('./tableData');


// ? -------------------------------------------------------------------- VIEW FUNCTIONS ---------------------------------------------------------------------------------------
function viewRoles(callback) {
    db.query(`SELECT role.id, title, department.name AS department, salary 
    FROM company_db.role 
    INNER JOIN department
    ON department_id = department.id
    ORDER BY id ASC;`, (err, result) => {
        if (err) throw err

        console.log(table.getTable(result));
        callback();
    })
}

async function ViewRolesByDepartment(name, callback) {
    let id = await tableData.getIDFromDepartment(name)

    db.query(`SELECT title FROM company_db.role
    WHERE role.department_id = ${id};`,
        (err, result) => {
            if (err) throw err

            console.log(table.getTable(result));
            callback();
        })
}

// ? -------------------------------------------------------------------- UPDATE FUNCTIONS ---------------------------------------------------------------------------------------
async function addRole(title, salary, department, callback) {
    let departmentID = await tableData.getIDFromDepartment(department)

    db.query(`INSERT INTO role (title, salary, department_id) 
    VALUES 
    (?, ?, ?);`, [title, salary, departmentID], (err, results) => {
        if (err) throw err

        console.log("success");
        callback();
    })
}

async function deleteRole(name, callback) {
    db.query(`DELETE FROM role
    WHERE title = "${name}"`, (err, results) => {
        if (err) throw err
        callback();
    })
}

module.exports = { viewRoles, addRole, deleteRole, ViewRolesByDepartment }