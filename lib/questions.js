const initialQuestions = [{
    type: 'list',
    message: 'What would you like to do?',
    name: 'answer',
    choices: ['view all employees', "add employee", "update employee role", "view all roles", "add role", "view all departments", "add department", "quit"]
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
    type: 'input',
    message: "What is your new employee's role?",
    name: "eRole",
},
{
    type: 'list',
    message: "What is your new employee's manager?",
    name: "eManager",
}]

const updateEmployee = [
    {
        type: 'list',
        message: 'who would you like to update?',
        name: 'eName'
    },
    {
        type: 'list',
        message: 'what would you like to update?',
        name: 'eUpdate'
    },
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