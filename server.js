const express = require('express');
const inquirer = require('inquirer');
const e = require('./lib/Employee');
const r = require('./lib/Role');
const d = require('./lib/Department');
const q = require('./lib/questions');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function askQuestions() {
    inquirer.prompt(q.initialQuestions)
    .then((response) =>
    {
        switch(response.answer){
            case "Employees":
                inquirer.prompt(q.employeeOptions)
                    .then((response) => {
                        switch (response.eOption)
                        {
                            case "View Employees":
                                inquirer.prompt(q.employeeViewOption)
                                    .then((response) => {
                                        switch(response.eView){
                                            case 'View All Employees':
                                                break;
                                            case 'View Employees By Manager':
                                                break;
                                            case 'View Employees By Department':
                                                break;
                                        }
                                    })
                                break;
                            case "Update Employees":
                                inquirer.prompt(q.employeeUpdateOptions)
                                .then((response) => {
                                    switch(response.eUpdate){
                                        case "Add Employee":
                                            inquirer.prompt(questions.addEmployee)
                                                .then((response) => {
                                                    e.addEmployee(response.eFName, response.eLName, response.eRole, response.eManager);})
                                            break;
                                        case "Update Existing Employee Traits":
                                            inquirer.prompt(questions.updateEmployee)
                                            .then((response) => {
                                                if(response.eUpdate == "role")
                                                {e.updateRole(response.eName, response.eRole)}
                                                else if (response.eUpdate == "manager")
                                                {e.updateManager(response.eName, response.eManager)}
                                            })
                                            break;
                                        case "Delete Employee":
                                            break;
                                    }
                                })
                                break;
                        }
                    })
                break;

            case "Departments":
                inquirer.prompt(q.departmentQuestions)
                .then((response) => {
                    switch(response.dOption)
                    {
                        case "View All Departments":
                            break;
                        case "Add Departments":
                            break;
                        case "Delete Departments":
                            break;
                        case "Check Utilizied Budget of Departments":
                            break;
                    }
                })
                break;

            case "Roles":
                inquirer.prompt(q.roleQuestions)
                .then((response) => {
                    switch(response.option)
                    {
                        case 'View Roles':
                            inquirer.prompt(q.roleViewQuestions)
                            .then((response) => {
                                switch(response.viewOption)
                                {
                                    case "View All Roles":
                                        break;
                                    case "View Roles By Department":
                                        break;
                                }
                            })
                            break;

                        case 'Add a New Role':
                            break;
                    }
                })
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