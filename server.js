/**
 * Please initialize npm first (if NO package.json available):
 * npm init
 * npm install ascii-cats
 * 
 */
const asciiCats = require('ascii-cats')

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
