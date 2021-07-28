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


// ? -------------------------------------------------------------------- INITIAL QUESTIONS ---------------------------------------------------------------------------------------
function askQuestions() {
    inquirer.prompt(q.initialQuestions)
    .then((response) =>
    {
        switch(response.answer){
            case "Employees":
                askEmployeeQuestions();
                break;

            case "Departments":
                askDepartmentQuestions();
                break;

            case "Roles":
                askRoleQuestions();
                break;
        }
    })
}


// ? -------------------------------------------------------------------- EMPLOYEE QUESTIONS ---------------------------------------------------------------------------------------
function askEmployeeQuestions() {
    inquirer.prompt(q.employeeOptions)
                    .then((response) => {
                        switch (response.eOption)
                        {
                            case "View Employees":
                                inquirer.prompt(q.employeeViewOption)
                                    .then((response) => {
                                        switch(response.eView){
                                            case 'View All Employees':
                                                e.viewEmployee(askQuestions);
                                                break;
                                            case 'View Employees By Manager':
                                                e.viewEmployeeByManager(askQuestions);
                                                break;
                                            case 'View Employees By Department':
                                                e.viewEmployeeByDepartments(askQuestions);
                                                break;
                                        }
                                    })
                                break;
                            case "Update Employees":
                                inquirer.prompt(q.employeeUpdateOptions)
                                .then((response) => {
                                    switch(response.eUpdate){
                                        case "Add Employee":
                                            inquirer.prompt(q.addEmployee)
                                                .then((response) => {e.addEmployee(response.eFName, response.eLName, response.eRole, response.eManager,askQuestions);})
                                            break;
                                        case "Update Existing Employee Traits":
                                            inquirer.prompt(q.updateEmployee)
                                            .then((response) => {
                                                if(response.eUpdate == "role")
                                                    {e.updateRole(response.eName, response.eRole,askQuestions)}
                                                else if (response.eUpdate == "manager")
                                                    {e.updateManager(response.eName, response.eManager,askQuestions)}
                                            })
                                            break;
                                        case "Delete Employee":
                                            inquirer.prompt(q.deleteEmployee)
                                            .then((response) => {e.deleteEmployee(response.name,askQuestions)})
                                            break;
                                    }
                                })
                                break;
                        }
                    })
}

// ? -------------------------------------------------------------------- DEPARTMENT QUESTIONS ---------------------------------------------------------------------------------------
function askDepartmentQuestions(){
    inquirer.prompt(q.departmentQuestions)
                .then((response) => {
                    switch(response.dOption)
                    {
                        case "View All Departments":
                            d.viewDepartments(askQuestions);
                            break;
                        case "Add Departments":
                            inquirer.prompt(q.addDepartment)
                            .then((response) => {
                                d.addDepartment(response.name, askQuestions);
                            })
                            break;
                        case "Delete Departments":
                            q.deleteDepartment()
                            break;
                        case "Check Utilizied Budget of Departments":
                            d.showDepartmentsBudget(askQuestions);
                            break;
                    }
                })
}

// ? -------------------------------------------------------------------- ROLE QUESTIONS ---------------------------------------------------------------------------------------
function askRoleQuestions(){
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
                                        r.viewRoles(askQuestions);
                                        break;
                                    case "View Roles By Department":
                                        inquirer.prompt(q.roleViewDepartment).then((response) => {r.ViewRolesByDepartment(response.department, askQuestions)})
                                        break;
                                }
                            })
                            break;
                        case 'Add a New Role':
                            r.addRole(askQuestions);
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