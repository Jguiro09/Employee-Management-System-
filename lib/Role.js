const db = require('./db');
const table = require ('console.table');
const tableData = require('./tableData');

function viewRoles(){
    db.query(`SELECT role.id, title, department.name AS department, salary 
    FROM company_db.role 
    INNER JOIN department
    ON department_id = department.id
    ORDER BY id ASC;`, (err, result) => {
        if (err) throw err

        console.log(table.getTable(result));
    })
}

async function addRole(title, salary, department){
    let departmentID =  await tableData.getIDFromDepartment(department)

    db.query(`INSERT INTO role (title, salary, department_id) 
    VALUES 
    (?, ?, ?);`, [title, salary, departmentID], (err, results) => {
        if (err) throw err

        console.log("success!");
    })}

module.exports = {viewRoles, addRole}