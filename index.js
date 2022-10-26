//node modules
const inquirer = require('inquirer');
const fs = require('fs')
const genHtml = require("./util/generateHtml")
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
        const {role} = employeeInput;
        //determine if its an Engineer or Intern and save the data accordingly.
        if (role === "Intern") {
            addIntern(role)
        } else {
            addEngineer(role)
        }
        
    })
}

//intern questions
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
    ]).then(internInput => {
        const { name, id, email, school, } = internInput;
        const intern = new Intern (name, id, email, school);
        teamArray.push(intern);
        console.log(teamArray);
        addExtraEmployees();
    })  
}

//Engineer questions
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
       
    ]).then(engineerInput => {
        const { name, id, email, github,} = engineerInput;
        const engineer = new Engineer (name, id, email, github);
        teamArray.push(engineer);
        console.log(teamArray);
        addExtraEmployees();
    })  
}

//prompts the user if they want to add more employees
const addExtraEmployees = () =>{
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to add another Employee?",
            name: "addMoreEmployees"
        },
    ]).then(answer =>{
        console.log(answer)
        if(answer.addMoreEmployees === true){
            addEmployee();
        } else if(answer.addMoreEmployees === false){
           buildTeam();
        }
    })
}
//Writes the teamArray to a index.html file
const buildTeam=()=>{
    fs.writeFile("./generateHTML/index.html",genHtml(teamArray),(err)=>{
        err ? console.log(err) : console.log("stuff")
    })
}

teamManager();
