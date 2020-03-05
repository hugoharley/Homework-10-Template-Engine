const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

start();
function start() {
    createManager();
    function createManager() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Provide manager's name:",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Please provide manager's ID:",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Please provide manager's Email:",
                    name: "email"
                },
                {
                    type: "input",
                    message: "Please provide the manager's office room number:",
                    name: "officeNumber"
                },
                {
                    type: "list",
                    message: "do you want to add members to the team?",
                    name: "role",
                    choices: ["yes", "no"]
                }
            ])
            .then((answers) => {
                const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                console.log('info1', answers);
                console.log('info2', manager);
                if (answers.role === "yes") {
                    createEmployee();
                }
                else {
                    return process.exit();
                }
            });
    }
    function createEmployee() {
        inquirer
            .prompt([

                {
                    type: "list",
                    message: "Is the team member an engineer or an intern?",
                    name: "role",
                    choices: ["engineer", "intern"]
                },
            ])
            .then((answers) => {
                if (answers.role === "engineer") {
                    createEng();
                }
                else if (answers.role === "intern") {
                    createIntern();
                }
                //prompt and ask is team member engineer or emplyee?
                //call createEng() or createIntern()
            })
    }
    function createEng() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Provide team member name:",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Please provide team member ID:",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Please provide team member Email:",
                    name: "email"
                },
                {
                    type: "input",
                    message: "Please provide your Git Hub username:",
                    name: "github"
                },
                {
                    type: "list",
                    message: "do you want to add members to the team?",
                    name: "role",
                    choices: ["yes", "no"]
                }
            ])
            .then(answers => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                console.log("info3", engineer);
                console.log("info4", answers);
                if (answers.role === "yes") {
                    createEmployee();
                }
                else {
                    return process.exit();
                }
            });
        // get engineer detils
        //then create emplyoee
        // add team member to array
    }
    function createIntern() {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Provide team member name:",
                    name: "name"
                },
                {
                    type: "input",
                    message: "Please provide team member ID:",
                    name: "id"
                },
                {
                    type: "input",
                    message: "Please provide team member Email:",
                    name: "email"
                },
                {
                    type: "input",
                    message: "please provide school:",
                    name: "school"
                },
                {
                    type: "list",
                    message: "do you want to add members to the team?",
                    name: "role",
                    choices: ["yes", "no"]
                }
            ])
            .then(answers => {
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                console.log("info7", intern);
                console.log("info6", answers);

                if (answers.role === "yes") {
                    createEmployee();
                }
                else {
                    return process.exit();
                }
            });
    }
}

async function init() {
    let employees = await start(Manager, Engineer, Intern);
    let renderHtml = render(employees);
    writeHTML(OUTPUT_DIR, outputPath, renderHtml);
}
init();
/*
let questions = ([
    {
        type: "input",
        message: "Provide team member name:",
        name: "name"
    },
    {
        type: "input",
        message: "Please provide team member ID:",
        name: "id"
    },
    {
        type: "input",
        message: "Please provide team member Email:",
        name: "email"
    },
    {
        type: "input",
        message: "Is the team member the manager, an engineer or an intern?",
        name: "role"
    },
    // {
    //     type: "input",
    //     message: "Please provide your Git Hub username",
    //     name: "github"
    // },
    // {
    //     type: "input",
    //     message: "please provide school",
    //     name: "school"
    // },
    // {
    //     type: "input",
    //     message: "please provide office number",
    //     name: "officeNumber"
    // }
])
inquirer.prompt(questions).then(answers => {
    if (answers.role === "engineer") {
        let engi = ([
            {
                type: "input",
                message: "Please provide your Git Hub username",
                name: "github"
            }
        ]);
        inquirer.prompt(engi);
    }
})
/*
async function getManInfo() {
    try {
        const manInfo = await inquirer.prompt([
            {
                type: "input",
                message: "What is Managers's name?",
                name: "manName"
            },
            {
                type: "input",
                message: "What is Managers's ID?",
                name: "manId"

            },
            {
                type: "input",
                message: "Please enter Manager's email address:",
                name: "manEmail"
            },
            {
                type: "input",
                message: "Please enter Manager's office number:",
                name: "manOfficeNumber"
            }
        ]);
        let response = manInfo;
        return response;
    } catch (err) {
        console.log(err);
    }
}

const getTeamInfo = async () => {

    const addNewMember = [
        {
            type: "confirm",
            message: "Add a team member?",
            name: "newmember"
        }
    ];

    const teamType = [
        {
            type: "list",
            message: "Which team member type is being added?",
            choices: ["Engineer", "Intern"],
            name: "memberType"
        }
    ];

    const allTeaminfo = [
        {
            type: "input",
            message: "Team Member's name:",
            name: "name"
        },
        {
            type: "input",
            message: "Team Member ID:",
            name: "ID"
        },
        {
            type: "input",
            message: "Team member's email:",
            name: "email"
        }
    ];

    const getGithub = [
        {
            type: "input",
            message: "Engineer's Github:",
            name: "github"
        }
    ];

    const getSchool = [
        {
            type: "input",
            message: "Intern's school: ",
            name: "school"
        }
    ];


    let newmember = true;

    let members = [""];

    while (newmember) {

        let res = await inquirer.prompt(addNewMember);

        if (res.newmember) {

            res = await inquirer.prompt(teamType);

            if (res.teamType == "Engineer") {
                console.log("Engineer!");

                let teamInfo = await inquirer.prompt(allTeaminfo);

                let githubUsername = await inquirer.prompt(getGithub);

                members.push({ name: teamInfo.name, email: teamInfo.email, guser: githubUsername.github, role: "Engineer" });
            }
            else if (res.teamType == "Intern") {
                console.log("Intern!");

                let teamInfo = await inquirer.prompt(allTeaminfo);

                let school = await inquirer.prompt(getSchool);

                members.push({ name: teamInfo.name, email: teamInfo.email, school: school.school, role: "Intern" });
            }
        }
        else {
            newmember = false;
        }


    }

    console.log(members);

}

async function init() {

    let manInfo = await getManInfo();
    let teamInfo = await getTeamInfo();


}





init();
/*
getTeamInfo();

async function addNewMember() {
    try {
        const newmember = await inquirer.prompt({
            type: "confirm",
            message: "Add new team member?",
            name: "newmember"
        });
        try {
            const teamType = await inquirer.prompt({
                type: "list",
                message: "Which team member type is being added?",
                choices: ["Engineer", "Intern"],
                name: "memberType"
            });
            try {
                const allTeamInfo = await inquirer.prompt([
                    {
                        type: "input",
                        message: "Team Member's Name:",
                        name: "name"
                    },
                    {
                        type: "input",
                        message: "Team Member ID?",
                        name: "ID"
                    },
                    {
                        type: "input",
                        message: "Team member's email:",
                        name: "email"
                    }
                ])
            }


        }
        }


    }
}

inquirer
    .prompt([
        {
            type: "input",
            message: "What is employee's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is employee's ID?",
            name: "Id"
        },
        {
            type: "input",
            message: "Please enter employee's email address:",
            name: "email"
        },
        {
            type: "input",
            message: "What is employee's role?",
            name: "role"
        },
        {
            type: "input",
            message: "What is employee's school?",
            name: "school"
        },
        {
            type: "input",
            message: "What is employee's github?",
            name: "github"
        },
        {
            type: "input",
            message: "What is employee's office Number?",
            name: "officeNumber"
        }
    ])
    .then(function (response) {
        //should i put the renderer code here?
        if (response.confirm === response.password) {
            console.log("Success!");
        }
        else {
            console.log("You forgot your password already?!");
        }
    });*/



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```


//const manager = new Manager(name, ID, email, officenumber);
//const engineer = new Engineer(answers.name, answers.ID, answers.email, answers.github);
//const intern = new Intern(answers.name, answers.ID, answers.email, answers.school);