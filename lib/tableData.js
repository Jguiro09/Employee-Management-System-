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
    })

    return employeeName;
}

function getDepartments()
{
    const departments = [];

    db.query(`SELECT name FROM department;`, (err, results) => {
        if (err) throw err
        results.forEach(i => {departments.push(i.name)})
    })

    return departments;
}

function getIndexFromName(str)
{
    return new Promise (function (resolve, reject){
        let index;
        db.query(`SELECT * FROM employee WHERE CONCAT(first_name, ' ', last_name) LIKE '%${str}%';`, function(err, results) {
            if (err) throw err
            
            index = results[0].id
            resolve(index);
        })
    })
}

function getIDFromDepartment(str)
{
    return new Promise (function (resolve, reject){
        let index;
        db.query(`SELECT * FROM department WHERE name LIKE '%${str}%';`, function(err, results) {
            if (err) throw err
            
            index = results[0].id
            resolve(index);
        })
    })
}

function getRoleIDFromString(str)
{
    return new Promise (function (resolve, reject) {
        db.query(`SELECT * FROM role WHERE title LIKE '%${str}%';`, async (err, results) => {
            if (err) throw err
            let id = await results[0].id
            resolve(id);
        })
    })
}

module.exports = {getRoles, getEmployeeNames, getIndexFromName, getRoleIDFromString, getDepartments, getIDFromDepartment}