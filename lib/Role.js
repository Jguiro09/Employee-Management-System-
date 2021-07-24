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

module.exports = {viewRoles}