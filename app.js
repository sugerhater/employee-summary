const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

const employees = [];

// {
//   type: 'input',
//   name: 'id',
//   message: 'What is the id of the person?'
// },

// {
//   type: 'input',
//   name: 'email',
//   message: 'What is the email of the person?'
// },

async function employeePrompt() {
  try {
    const { name, id, email, role } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the person?'
      },

      {
        type: 'input',
        name: 'id',
        message: 'What is the id of the person?'
      },

      {
        type: 'input',
        name: 'email',
        message: 'What is the email of the person?'
      },

      {
        type: 'list',
        name: 'role',
        message: 'What is the role of the person?',
        choices: ['manager', 'engineer', 'intern'],
      },
    ])
  

  switch (role) {
    // if role = manager
    // -- create new manager obj
    case 'manager':
      const { officeNumber } = await inquirer.prompt([
        {
          type: 'input',
          name: 'officeNumber',
          message: 'What is the office number of the manager?'
        }
      ]);


      employees.push(new Manager(name, id, email, officeNumber));
      break;
    // if role = intern
    // -- create new intern obj
    case 'intern':
      const { school } = await inquirer.prompt([
        {
          type: 'input',
          name: 'school',
          message: 'What is the school name of the intern?'
        },
      ])

      employees.push(new Intern(name, id, email, school));
      break;

    // if role = engineer
    // -- create new eng obj
    case 'engineer':
      const { github } = await inquirer.prompt([
        {
          type: 'input',
          name: 'github',
          message: 'What is the GitHub username of the engineer?'
        },

      ])

      employees.push(new Engineer(name, id, email, github));
      break;
  }

  const { continueOn } = await inquirer.prompt([
    {
      type: 'list',
      name: 'continueOn',
      message: 'keeping going?',
      choices: ['yes', 'no'],
    }
  ]);

  if (continueOn === 'yes') {
    return employeePrompt();
  }

} catch (err) {
  console.log(err)
}

  // if (data.continue === 'yes'){
  //   EmployeePrompt()
  // }
  // ***create the emp using the class ***
  // if role = engineer
  // -- create new eng obj
  // if role = intern
  // -- create new intern obj

  // push that emp to your emp array

  // if continue is yes
  // -- EmployeePrompt();
}

employeePrompt().then(() => {

  console.log(employees)
  const htmlContent = render(employees);

  writeFileAsync(outputPath, htmlContent);

  console.log("render function runned")

})

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
// for the provided `render` function to work! ```
