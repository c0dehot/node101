/**
 * Please initialize npm first (if NO package.json available):
 * npm init
 * npm install ascii-cats
 * npm install chalk
 */


console.log( process.env.USER )

console.log( process.argv )

process.exit()


const asciiCats = require('ascii-cats')
const chalk = require('chalk')
// import chalk from "chalk"

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
console.log(`${chalk.yellow("Hello")} World${chalk.red("!")}`);
 
// chainable API
console.log(chalk.green.bgRed.bold("Hello world!"));
