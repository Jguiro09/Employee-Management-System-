const tableData = require('./tableData');

const initialQuestions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'answer',
    choices: ['view all employees', "add employee", "update employee", "view all roles", "add role", "view all departments", "add department", "quit"]
}]


// ?---------------------------------------------EMPLOYEE QUESTIONS------------------------------------------

const addEmployee = [{
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
    choices: tableData.getRoles()
},
{
    type: 'list',
    message: "What is your new employee's manager?",
    name: "eManager",
    choices: tableData.getEmployeeNames()
}]

const updateEmployee = [
    {
        type: 'list',
        message: 'who would you like to update?',
        name: 'eName',
        choices: tableData.getEmployeeNames()
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
        choices: tableData.getRoles(),
        when: (list) => list.eUpdate == "role"
    },
    {
        type: 'list',
        message: 'Manager would you like to switch their manager to?',
        name: 'eManager',
        choices: tableData.getEmployeeNames(),
        when: (list) => list.eUpdate == "manager"
    }
]

// ?---------------------------------------------ROLE QUESTIONS------------------------------------------

const addRole = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'name'
    },
    {
        type: 'number',
        message: 'What is the salary of the role?',
        name: 'salary'
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'department'
    }
]

// ?---------------------------------------------DEPARTMENT QUESTIONS------------------------------------------

const addDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
    }
];

module.exports = {initialQuestions, addEmployee, updateEmployee, addRole, addDepartment}