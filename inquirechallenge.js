/*
#1 inquire.prompt()
Ask if the user is over 18

based on that result:

#2 if they are over 18,
ask them what their favourite alcoholic drink or otherwise favourite TV show

OR #3 if they under 18,
ask them what their favourite cartoon is

output the result AFTER we have got both questions answered



*/

const inquirer = require("inquirer");

async function mainApp(){
  const response = await inquirer
    .prompt([
      {
        type: "",
        message: "",
        name: ""
      }
    ])

    console.log( `inquirer prompts finished, got response: `, response )
  }
  mainApp()

