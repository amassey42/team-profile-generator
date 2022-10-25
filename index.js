//node modules
const inquirer = require('inquirer');
const fs = require('fs')
//Role profiles
const Employee = require('./lib/Employee');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager')

//team
const teamArray = [];

const teamManager = ()=>{
    inquirer.prompt([
        {
            type: "input",
            message: "Who is your team's manager?",
            name: "name"
        },
        {
            type: "input",
            message: "Please enter your Manager's id number.",
            name: 'id'
        },
        {
            type: "input",
            message: "Please enter your Manager's email.",
            name: 'email'
        },
        {
            type: "input",
            message: "Please enter your manager's office number.",
            name: "officeNumber"
        }
    ]) .then(managerInput =>{
        const { name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        teamArray.push(manager);
        console.log(manager);
    })
    addEmployee();
};

const addEmployee = ()=>{
    inquirer.prompt([
        {
            type: "list",
            name:"role",
            message: "What is your emoployee's position?",
            choices: ["Intern", "Engineer"]
        },  
        {
            type: "input",
            message: "Please enter your employee's name.",
            name: 'name'
        },

        {
            type: "input",
            message: "Please enter your employee's id number.",
            name: 'id'
        },
        {
            type: "input",
            message: "Please enter your employees email.",
            name: 'email'
        },
        {
            type: "input",
            message: "Please enter your employees github username.",
            name: "github"
        },
        {
            type: "input",
            message: "Please enter your Intern's school.",
            name: "github"
        },
        {
            type: "confirm",
            message: "Would you like to add another Employee?.",
            name: "addMoreEmployees"
        },
    ]).then(employeeInput =>{
        const { name, id, email, role, github, school, addMoreEmployees} = employeeInput;
        let employee;
    })
}

teamManager();