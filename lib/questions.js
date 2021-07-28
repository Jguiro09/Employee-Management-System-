const inquirer = require('inquirer');
const tableData = require('./tableData');
const e = require('./Employee');
const r = require('./Role');
const d = require('./Department');

async function initialQuestions() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'answer',
        choices: ['Employees', "Departments", "Roles", "Quit"]
    }])
        .then((response) => {
            switch (response.answer) {
                case "Employees":
                    employeeOptions();
                    break;

                case "Departments":
                    departmentQuestions();
                    break;

                case "Roles":
                    roleQuestions();
                    break;
            }
        })
}

// ?---------------------------------------------EMPLOYEE QUESTIONS------------------------------------------
async function employeeOptions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do with Employees?',
            name: 'eOption',
            choices: ['View Employees', 'Update Employees']
        }
    ])
        .then((response) => {
            switch (response.eOption) {
                case "View Employees":
                    employeeViewOption();
                    break;
                case "Update Employees":
                    employeeUpdateOptions();
                    break;
            }
        })
}

// * -----------------------------View Employee Questions---------------------

async function employeeViewOption() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do with Employees?',
            name: 'eView',
            choices: ['View All Employees', 'View Employees By Manager', 'View Employees By Department']
        }
    ])
        .then((response) => {
            switch (response.eView) {
                case 'View All Employees':
                    e.viewEmployee(initialQuestions);
                    break;
                case 'View Employees By Manager':
                    e.viewEmployeeByManager(initialQuestions);
                    break;
                case 'View Employees By Department':
                    e.viewEmployeeByDepartments(initialQuestions);
                    break;
            }
        })
}

// * -----------------------------Update Employee Questions---------------------

async function employeeUpdateOptions() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to update with the Employees?',
        name: 'eUpdate',
        choices: ['Add Employee', 'Update Existing Employee Traits', 'Delete Employee']
    }])
        .then((response) => {
            switch (response.eUpdate) {
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Existing Employee Traits":
                    updateEmployee();
                    break;
                case "Delete Employee":
                    deleteEmployee();
                    break;
            }
        })
}

async function addEmployee() {
    const choicesEmployee = await tableData.getEmployeeNames();
    const choicesRole = await tableData.getRoles();

    inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is your new employee's first name?",
                name: "eFName",
            },
            {
                type: 'input',
                message: "What is your new employee's last name?",
                name: "eLName",
            },
            {
                type: 'list',
                message: "What is your new employee's role?",
                name: "eRole",
                choices: choicesRole
            },
            {
                type: 'list',
                message: "What is your new employee's manager?",
                name: "eManager",
                choices: choicesEmployee
            }
        ])
        .then((response) => { e.addEmployee(response.eFName, response.eLName, response.eRole, response.eManager, initialQuestions); })
}

async function updateEmployee() {
    const choicesEmployee = await tableData.getEmployeeNames();
    const choicesRole = await tableData.getRoles();
    const choiceManager = await tableData.getManagers();

    inquirer.prompt([
        {
            type: 'list',
            message: 'who would you like to update?',
            name: 'eName',
            choices: choicesEmployee
        },
        {
            type: 'list',
            message: 'what would you like to update?',
            name: 'eUpdate',
            choices: ['role', 'manager']
        },
        {
            type: 'list',
            message: 'What would you like to switch their role to?',
            name: 'eRole',
            choices: choicesRole,
            when: (list) => list.eUpdate == "role"
        },
        {
            type: 'list',
            message: 'Manager would you like to switch their manager to?',
            name: 'eManager',
            choices: choiceManager,
            when: (list) => list.eUpdate == "manager"
        }
    ])
        .then((response) => {
            if (response.eUpdate == "role") { e.updateRole(response.eName, response.eRole, initialQuestions) }
            else if (response.eUpdate == "manager") { e.updateManager(response.eName, response.eManager, initialQuestions) }
        })
}

async function deleteEmployee() {
    const choices = await tableData.getEmployeeNames()

    inquirer.prompt([
        {
            type: 'list',
            message: 'Who would you like to delete?',
            name: 'name',
            choices: choices
        }
    ])
        .then((response) => { e.deleteEmployee(response.name, initialQuestions) })
}

// ?---------------------------------------------ROLE QUESTIONS------------------------------------------
async function roleQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do with roles?',
            name: 'option',
            choices: ['View Roles', 'Add a New Role', 'Delete an Existing Role']
        }
    ])
        .then((response) => {
            switch (response.option) {
                case 'View Roles':
                    roleViewQuestions()
                    break;
                case 'Add a New Role':
                    addRole();
                    break;
                case 'Delete an Existing Role':
                    deleteRole();
                    break;
            }
        })
}

// * -----------------------------View Role Questions---------------------
async function roleViewQuestions() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'How would you like to view the roles?',
            name: 'viewOption',
            choices: ['View All Roles', 'View Roles By Department']
        }
    ])
        .then((response) => {
            switch (response.viewOption) {
                case "View All Roles":
                    r.viewRoles(initialQuestions);
                    break;
                case "View Roles By Department":
                    roleViewDepartment();
                    break;
            }
        })
}

async function roleViewDepartment() {
    const choices = await tableData.getDepartments()
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to view?',
            name: 'department',
            choices: choices
        }
    ])
        .then((response) => { r.ViewRolesByDepartment(response.department, initialQuestions) })
}

// * -----------------------------Update Role Questions---------------------

async function addRole() {
    const choices = await tableData.getDepartments()
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'title'
            },
            {
                type: 'number',
                message: 'What is the salary of the role?',
                name: 'salary'
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                name: 'department',
                choices: choices
            }
        ])
        .then((results) => r.addRole(results.title, results.salary, results.department, initialQuestions))
}

async function deleteRole() {
    const choices = await tableData.getRoles();

    inquirer.prompt([
        {
            type: 'list',
            message: 'What is the name of the role you would like to delete?',
            name: 'name',
            choices: choices
        }
    ]).then((response) => {
        r.deleteRole(response.name, initialQuestions)
    })
}

// ?---------------------------------------------DEPARTMENT QUESTIONS------------------------------------------
async function departmentQuestions() {
    inquirer.prompt(
        [{
            type: 'list',
            message: 'What would you like to do with the Departments?',
            name: 'dOption',
            choices: ['View All Departments', 'Add Departments', 'Delete Departments', 'Check Utilizied Budget of Departments']
        }]
    )
        .then((response) => {
            switch (response.dOption) {
                case "View All Departments":
                    d.viewDepartments(initialQuestions);
                    break;
                case "Add Departments":
                    addDepartment();
                    break;
                case "Delete Departments":
                    deleteDepartment()
                    break;
                case "Check Utilizied Budget of Departments":
                    d.showDepartmentsBudget(initialQuestions);
                    break;
            }
        })
};

// * -----------------------------Update Department Questions---------------------

async function addDepartment() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'name'
            }
        ])
        .then((response) => {
            d.addDepartment(response.name, initialQuestions);
        })
}

async function deleteDepartment() {
    const choices = await tableData.getDepartments()
    inquirer.prompt([
        {
            type: 'list',
            message: 'What is the name of the department you would like to delete?',
            name: 'name',
            choices: choices
        }
    ]).then((response) => {
        d.deleteDepartment(response.name, initialQuestions)
    })
}

module.exports = { initialQuestions, employeeOptions, employeeViewOption, employeeUpdateOptions, addEmployee, updateEmployee, deleteEmployee, roleQuestions, addRole, roleViewQuestions, roleViewDepartment, departmentQuestions, addDepartment, deleteDepartment }