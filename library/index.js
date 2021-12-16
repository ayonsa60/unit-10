// GIVEN a command-line application that accepts user input
// WHEN I am prompted for my team members and their information
// THEN an HTML file is generated that displays a nicely formatted team roster based on user input
// WHEN I click on an email address in the HTML
// THEN my default email program opens and populates the TO field of the email with the address
// WHEN I click on the GitHub username
// THEN that GitHub profile opens in a new tab
// WHEN I start the application
// THEN I am prompted to enter the team manager’s name, employee ID, email address, and office number
// WHEN I enter the team manager’s name, employee ID, email address, and office number
// THEN I am presented with a menu with the option to add an engineer or an intern or to finish building my team
// WHEN I select the engineer option
// THEN I am prompted to enter the engineer’s name, ID, email, and GitHub username, and I am taken back to the menu
// WHEN I select the intern option
// THEN I am prompted to enter the intern’s name, ID, email, and school, and I am taken back to the menu
// WHEN I decide to finish building my team
// THEN I exit the application, and the HTML is generated

const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./assets/lib/Engineer.js");
const Intern = require("./assets/lib/Intern");
const Manager = require("./assets/lib/Manager");

const employee = [];

function init() {
    startingHTML();
    addEmployee();
}

function addEmployee() {
    inquirer.prompt([{
        message: "Enter employee's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select employee's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter employee's id",
        name: "id"
    },
    {
        message: "Enter employee's email address",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter employee's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more employees?",
            choices: [
                "yes",
                "no"
            ],
            name: "addingEmployee"
        }])
        .then(function({roleInfo, addingEmployee}) {
            let newEmployee;
            if (role === "Engineer") {
                newEmployee = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newEmployee = new Intern(name, id, email, roleInfo);
            } else {
                newEmployee = new Manager(name, id, email, roleInfo);
            }
            employee.push(newEmployee);
            addHtml(newEmployee)
            .then(function() {
                if (addingEmployee === "yes") {
                    addEmployee();
                } else {
                    finalHTML();
                }
            });
            
        });
    });
}

function renderHtml(employeeArray) {
    startingHTML();
    for (const employee of employeeArray) {
        addHtml(employee);
    }
    finalHTML();
}
init();