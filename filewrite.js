const fs = require('fs') // fs | http 

function writeComplete( err, data ){
    if( err ){
        console.log( `Sorry something went wrong.` )
        return;
    }

    console.log( `Finished Writing file.` )
}

const newReadMe = `
##Hello World##
We are a new file

Hey guys 11 June
`


fs.writeFile( 'README.md', newReadMe, 'utf8', writeComplete )
