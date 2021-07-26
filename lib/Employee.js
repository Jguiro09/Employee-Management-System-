const db = require('./db');
const table = require ('console.table');
const tableData = require('./tableData');

function viewEmployee(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(e2.first_name, ', ', e2.last_name) AS manager
    FROM employee 
    INNER JOIN role 
    ON role.id = employee.role_id
    INNER JOIN department 
    ON role.department_id = department.id
	LEFT JOIN employee e2
    ON employee.manager_id = e2.id
    ORDER BY employee.id ASC;`, (err, result) => {
        if (err) throw err
        let test = table.getTable(result);
        return console.log(test);
    })}

async function addEmployee(fName, lName, role, manager){
    let managerID =  await tableData.getIndexFromName(manager)
    let roleID =   await tableData.getRoleIDFromString(role)

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES 
    (?, ?, ?, ?);`, [fName, lName, roleID, managerID], (err, results) => {
        if (err) throw err
    })}

async function updateRole(name, role){
    let roleID =   await tableData.getRoleIDFromString(role)
    let id = await tableData.getIndexFromString(name)

    db.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        console.log("Success!");
})}

async function updateManager(name, manager){
    let id = await tableData.getIndexFromString(name)
    let managerID =  await tableData.getIndexFromString(manager)
    
    db.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        console.log("Success!");
})}

module.exports = {viewEmployee, addEmployee, updateRole, updateManager};
