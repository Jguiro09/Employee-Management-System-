const db = require('./db');
const tableData = require('./tableData');


// ? -------------------------------------------------------------------- VIEW FUNCTIONS ---------------------------------------------------------------------------------------
function viewEmployee(callback) {
    db.query(`SELECT employee.first_name, employee.last_name, title, department.name AS department, salary, CONCAT(e2.first_name, ', ', e2.last_name) AS manager
    FROM employee 
    INNER JOIN role 
    ON role.id = employee.role_id
    INNER JOIN department 
    ON role.department_id = department.id
	LEFT JOIN employee e2
    ON employee.manager_id = e2.id
    ORDER BY employee.id ASC;`, (err, result) => {
        if (err) throw err
        console.table(result);
        callback();
    })
}

async function viewEmployeeByManager(manager, callback) {
    let managerID = await tableData.getIndexFromName(manager);

    db.query(`SELECT first_name, last_name, title
        FROM company_db.employee 
        INNER JOIN role
        ON role_id = role.id
        WHERE manager_id = ${managerID};`, (err, result) => {
        if (err) throw err
        console.table(result);
        callback();
    })
}

async function viewEmployeeByDepartments(department, callback) {

    let departmentID = await tableData.getIDFromDepartment(department);

    db.query(`SELECT first_name, last_name, title
FROM company_db.employee 
INNER JOIN role
ON role_id = role.id
WHERE department_id = ${departmentID};`, (err, result) => {
        if (err) throw err
        console.table(result);
        callback();
    })
}


// ? -------------------------------------------------------------------- UPDATE FUNCTIONS ---------------------------------------------------------------------------------------
async function addEmployee(fName, lName, role, manager, callback) {
    let managerID = await tableData.getIndexFromName(manager)
    let roleID = await tableData.getRoleIDFromString(role)

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) 
    VALUES 
    (?, ?, ?, ?);`, [fName, lName, roleID, managerID], (err, results) => {
        if (err) throw err
        callback();
    })
}

async function deleteEmployee(name, callback) {
    let nameID = await tableData.getIndexFromName(name);

    db.query(`DELETE FROM employee
    WHERE id = ${nameID}`, (err, results) => {
        if (err) throw err
    })
    callback();
}

async function updateRole(name, role, callback) {
    let roleID = await tableData.getRoleIDFromString(role)
    let id = await tableData.getIndexFromName(name)

    db.query(`UPDATE employee SET role_id = ${roleID} WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        console.log("Success!");
        callback();
    })
}

async function updateManager(name, manager, callback) {
    let id = await tableData.getIndexFromName(name)
    let managerID = await tableData.getIndexFromName(manager)

    db.query(`UPDATE employee SET manager_id = ${managerID} WHERE id = ${id}`, (err, results) => {
        if (err) throw err
        console.log("Success!");
        callback();
    })
}

module.exports = { viewEmployee, viewEmployeeByManager, deleteEmployee, viewEmployeeByDepartments, addEmployee, updateRole, updateManager };
