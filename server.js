const express = require('express');
const inquirer = require('inquirer');
const e = require('./lib/Employee');
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
                tableData.getEmployeeNames();
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