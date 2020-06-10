var inquirer = require("inquirer");

async function mainApp(){
  const response = await inquirer
    .prompt([
      {
        type: "input",
        message: "What is your user name?",
        name: "username"
      },
      {
        type: "password",
        message: "What is your password?",
        name: "password"
      },
      {
        type: "password",
        message: "Re-enter password to confirm:",
        name: "confirm"
      }
    ])

    console.log( `inquirer prompts finished, got response: `, response )

    if (response.confirm !== response.password) {
      console.log("Sorry passwords do not match, please re-run");
      process.exit()
    }

    console.log("Passwords are the same, accepting!");    
  }
  mainApp()

