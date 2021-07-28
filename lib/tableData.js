const db = require('./db');


// ? --------------------------------------------------- GETS THE TITLE/NAMES FROM EACH TABLE --------------------------------------
function getRoles() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT title FROM role;`, (err, results) => {
            if (err) throw err
            var roles = results.map(i => { return i.title })
            resolve(roles)
        })
    })
}

function getEmployeeNames() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`, (err, results) => {
            if (err) throw err
            var employees = results.map(i => { return i.name })
            resolve(employees)
        })
    })
}

function getManagers() {
    return new Promise((resolve, reject) => {
        db.query(`SELECT first_name, last_name from employee WHERE manager_id IS NULL;`, (err, results) => {
            if (err) throw err
            var manager = results.map(i => { return `${i.first_name} ${i.last_name}` })
            resolve(manager)
        })
    })
}

function getDepartments() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT name FROM department;`, (err, results) => {
            if (err) throw err
            var departments = results.map(i => { return i.name })
            resolve(departments)
        })
    })
}


// ? --------------------------------------------------- GETS THE IDS OF CERTAIN ELEMENTS FROM EACH TABLE --------------------------------------

function getIndexFromName(str) {
    return new Promise(function (resolve, reject) {
        let index;
        db.query(`SELECT * FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '%${str}%';`, function (err, results) {
            if (err) throw err;

            index = results[0].id
            resolve(index);
        })
    })
}

function getIDFromDepartment(str) {
    return new Promise(function (resolve, reject) {
        let index;
        db.query(`SELECT * FROM department WHERE name LIKE '%${str}%';`, function (err, results) {
            if (err) throw err

            index = results[0].id
            resolve(index);
        })
    })
}

function getRoleIDFromString(str) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM role WHERE title LIKE '%${str}%';`, async (err, results) => {
            if (err) throw err
            let id = await results[0].id
            resolve(id);
        })
    })
}

module.exports = { getRoles, getEmployeeNames, getManagers, getIndexFromName, getRoleIDFromString, getDepartments, getIDFromDepartment }