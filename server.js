const express = require('express');
const inquirer = require('inquirer');
const e = require('./lib/Employee');
const r = require('./lib/Role');
const questions = require('./lib/questions');
const tableData = require('./lib/tableData');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function askQuestions() {
    inquirer.prompt(questions.initialQuestions)
    .then((response) =>
    {
        switch(response.answer){
            case 'view all employees':
                e.viewEmployee();
                break;
            case "quit":
                // tableData.getEmployeeNames();
                break;
            case "add employee":
                inquirer.prompt(questions.addEmployee)
                .then((response) => {
                    e.addEmployee(response.eFName, response.eLName, response.eRole, response.eManager);
                })
                break;
            case "update employee":
                inquirer.prompt(questions.updateEmployee)
                .then((response) => {
                    if(response.eUpdate == "role")
                    {e.updateRole(response.eName, response.eRole)}
                    else if (response.eUpdate == "manager")
                    {e.updateManager(response.eName, response.eManager)}
                })
                break;
            case "view all roles":
                r.viewRoles();
                break;
            case "add role":
                inquirer.prompt(questions.addRole)
                .then((response) => {
                    r.addRole(response.title, response.salary, response.department)
                })
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