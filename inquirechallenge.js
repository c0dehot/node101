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
let userInfo;

async function mainApp(){
  const response = await inquirer
    .prompt([
        {   type: "input",
            message: "What is your name?",
            name: "userName" },
        {
            type: "input",
            message: "Are you over 18",
            name: "userAge"
        }
    ])
    userInfo = { ...userInfo, ...response }

    // object is created
    //{ userName: "Fil", userAge: 45 }
    if( response.userAge>18 ){
        // new inquirer prompt
        const response = await inquirer.prompt([
            {   type: "input",
                message: "What is your favourite alcoholic beverage?",
                name: "favAlcohol" }
        ])
        userInfo = { ...userInfo, ...response }

    } else {
        console.log( `sorry kid, cant help you` )
    }

    console.log( `userInfo: `, userInfo )
  }
  // runs async
  mainApp()

  
