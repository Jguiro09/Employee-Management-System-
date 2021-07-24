const e = require('express');
const db = require('./db');

function getRoles()
{
    const roles = [];

    db.query(`SELECT title FROM role;`, (err, results) => {
        if (err) throw err
        results.forEach(i => {roles.push(i.title)})
    })

    return roles;
}

function getEmployeeNames(){

    const employeeName = [];

    db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name FROM employee;`, (err, results) => {
        if (err) throw err
        results.forEach(i => {employeeName.push(i.name)})
        console.log(employeeName)
    })
}


module.exports = {getRoles, getEmployeeNames}