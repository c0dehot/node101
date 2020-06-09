/**
 * Please initialize npm first (if NO package.json available):
 * npm init
 * npm install ascii-cats
 * npm install chalk
 */
const asciiCats = require('ascii-cats')
const chalk = require('chalk')
//import chalk from "chalk" // SAME as require

let name = "Fil"

console.log( `Hey ${name}, I am Node`)

console.log( `...............................` )

function getTime(){
    return new Date()
}
console.log( `The date is: ${getTime()}` )

// run our new npm package called 'ascii-cats'
const myCatAsciiImage = asciiCats()
console.log( myCatAsciiImage )



console.log( `...............................` )

// string concatenation - template literals
console.log(`${chalk.blue("Hello")} World${chalk.red("!")}`);
 
// chainable API
console.log(chalk.blue.bgRed.bold("Hello world!"));
