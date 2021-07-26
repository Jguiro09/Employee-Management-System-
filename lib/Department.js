const db = require('./db');
const table = require ('console.table');

function viewDepartments(){
    db.query(`SELECT *
    FROM department 
    ORDER BY id ASC;`, (err, result) => {
        if (err) throw err

        console.table(table.getTable(result));
    })
}

function addDepartment(name){
    db.query(`INSERT INTO department (name) 
    VALUES 
    (?);`, [name], (err, results) => {
        if (err) throw err

        console.log("success!");
    })}

module.exports = {viewDepartments, addDepartment}