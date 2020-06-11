/**
 * Usage:
 * node appendemail.js <new-email>
 * 
 * It will take this eail and append it to the 'emails.txt' file
 * THEN Read the new updated list
 */
const fs = require('fs') // fs | http 

const newEmail = process.argv[2].trim().toLowerCase()
const emailFile = 'emails.txt'

const version = 'sync'

// -- using with callbacks ----------------------------------------------------
if( version=='callback' ){
    function displayList( err, result ){
        if( err ){
            console.log( `Unable to read file: ${emailList}`, err )
            process.exit()
        }

        console.log( `The full email list is:\n${result}`)
    }

    function appendAndDisplayList( err, result ){
        if( err ){
            // something went wrong
            console.log( `Sorry unable to append to the file ${emailList}`, err )
            process.exit()
        }

        console.log( `Finished writing email address`)

        // get the full list
        fs.readFile( emailFile, 'utf8', displayList )
    }

    fs.appendFile( emailFile, `\n${newEmail}`, 'utf8', 
        appendAndDisplayList )
} 
// -- Syncronous file operations --------------------------------------------------------
else if( version=='sync' ){
    try{
        const writeResult = fs.appendFileSync( emailFile, `\n${newEmail}`, 'utf8' )

        const readData = fs.readFileSync( emailFile, 'utf8' )

        console.log( `Read the file: ${readData}`)
        
    } catch( err ){
        console.log( `Sorry we had a problem: `, err )
    }
}