/**
 * Usage:
 * node appendemail.js <new-email>
 * 
 * It will take this eail and append it to the 'emails.txt' file
 */
const fs = require('fs') // fs | http 

const newEmail = process.argv[2].trim().toLowerCase()
const emailFile = 'emails.txt'

fs.appendFile( emailFile, `\n${newEmail}`, 'utf8', 
    function(err,data){ console.log( `Finished writing email address`) } )
