const express = require('express');
const inquirer = require('inquirer');
const table = require ('console.table');
const e = require('./lib/Employee');
const db = require('./lib/db');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function askQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'answer',
            choices: ['view all employees', "add employee", "update employee role", "view all roles", "add role", "view all departments", "add department", "quit"]
        },
        {
            type: 'input',
            message: "What is your new employee's first name?",
            name: "eFName",
            when: (list) => list.answer == "add employee"
        },
        {
            type: 'input',
            message: "What is your new employee's last name?",
            name: "eLName",
            when: (list) => list.answer == "add employee"
        },
        {
            type: 'input',
            message: "What is your new employee's roleID?",
            name: "eRole",
            when: (list) => list.answer == "add employee"
        }
    ])
    .then((response) =>
    {
        console.log(response);
        console.log("done!");

        switch(response.answer){
            case 'view all employees':
                e.viewEmployee();
                break;
            case "quit":
                e.getRole();
                break;
            case "add employee":
                e.addEmployee(response.eFName, response.eLName, response.eRole);
                break;
        }
    })
}

askQuestions();

app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});