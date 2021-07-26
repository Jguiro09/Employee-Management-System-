const tableData = require('./tableData');

const initialQuestions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'answer',
    choices: ['Employees', "Departments","Roles", "Quit"]
}]

// ?---------------------------------------------EMPLOYEE QUESTIONS------------------------------------------
const employeeOptions = [{
    type: 'list',
    message: 'What would you like to do with Employees?',
    name: 'eOption',
    choices: ['View Employees', 'Update Employees']
}]

const employeeViewOption = [{
    type: 'list',
    message: 'What would you like to do with Employees?',
    name: 'eView',
    choices: ['View All Employees', 'View Employees By Manager', 'View Employees By Department']
}]

const employeeUpdateOptions = [{
    type: 'list',
    message: 'What would you like to update with the Employees?',
    name: 'eUpdate',
    choices: ['Add Employee', 'Update Existing Employee Traits', 'Delete Employee']
}]

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
        choices: tableData.getManagers(),
        when: (list) => list.eUpdate == "manager"
    }
]

const deleteEmployee = [
    {
        type: 'list',
        message: 'Who would you like to delete?',
        name: 'name',
        choices: tableData.getEmployeeNames()
    }
]

// ?---------------------------------------------ROLE QUESTIONS------------------------------------------
const roleQuestions = [{
    type: 'list',
    message: 'What would you like to do with roles?',
    name: 'option',
    choices: ['View Roles', 'Add a New Role']
}];

const roleViewQuestions = [
    {
        type: 'list',
        message: 'How would you like to view the roles?',
        name: 'viewOption',
        choices: ['View All Roles', 'View Roles By Department']
    }
]

const addRole = [
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
        choices: tableData.getDepartments()
    }
]

// ?---------------------------------------------DEPARTMENT QUESTIONS------------------------------------------
const departmentQuestions = [{
    type: 'list',
    message: 'What would you like to do with the Departments?',
    name: 'dOption',
    choices: ['View All Departments', 'Add Departments', 'Delete Departments', 'Check Utilizied Budget of Departments']
}];

const addDepartment = [
    {
        type: 'input',
        message: 'What is the name of the department?',
        name: 'name'
    }
];

const deleteDepartment = [
    {
        type: 'list',
        message: 'What is the name of the department you would like to delete?',
        name: 'name',
        choices: getDepartments()
    }
];

module.exports = {initialQuestions, employeeOptions, employeeViewOption, employeeUpdateOptions, addEmployee, updateEmployee, deleteEmployee, roleQuestions, addRole, roleViewQuestions, departmentQuestions, addDepartment, deleteDepartment}