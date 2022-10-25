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

//team manager prompt
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
        //takes manager input and adds it to the team array
        const { name, id, email, officeNumber} = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        teamArray.push(manager);
        console.log(manager);
        addEmployee();
    })
};

//employee prompt
const addEmployee = ()=>{
    inquirer.prompt([
        {
            type: "list",
            name:"role",
            message: "What is your emoployee's position?",
            choices: ["Intern", "Engineer"]
        } 
    ]).then(employeeInput =>{
        //takes employee inputs and adds it to array.
        const { name, id, email, role, github, school, addMoreEmployees} = employeeInput;
        //determine if its an Engineer or Intern and save the data accordingly.
        if (role === "Intern") {
            addIntern(role)
        } else {
            addEngineer(role)
        }
        
    })
}

const addIntern = (role) => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter your Intern's name.",
            name: 'name'
        },

        {
            type: "input",
            message: "Please enter your Intern's id number.",
            name: 'id'
        },
        {
            type: "input",
            message: "Please enter your Intern's email.",
            name: 'email'
        },
        {
            type: "input",
            message: "Please enter your Intern's school.",
            name: "school"
        },
        {
            type: "confirm",
            message: "Would you like to add another Employee?",
            name: "addMoreEmployees"
        },
    ]).then(internInput => {
        const { name, id, email, school, addMoreEmployees } = internInput;
        const intern = new Intern (name, id, email, school);
        teamArray.push(intern);
        console.log(teamArray);
    })  
}

const addEngineer = (role) => {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter your Engineer's name.",
            name: 'name'
        },

        {
            type: "input",
            message: "Please enter your Engineer's id number.",
            name: 'id'
        },
        {
            type: "input",
            message: "Please enter your Engineer's email.",
            name: 'email'
        },
        {
            type: "input",
            message: "Please enter your Engineer's github username.",
            name: "github"
        },
        {
            type: "confirm",
            message: "Would you like to add another Employee?",
            name: "addMoreEmployees"
        },
    ]).then(engineerInput => {
        const { name, id, email, github, addMoreEmployees } = engineerInput;
        const engineer = new Intern (name, id, email, github);
        teamArray.push(engineer);
        console.log(teamArray);
    })  
}

teamManager();