const fs = require('fs') // fs | http 

function readComplete( err, data ){
    if( err ){
        console.log( `Sorry something went wrong.` )
        return;
    }

    console.log( `Finished reading: '${data}'` )
}

fs.readFile('README.md', 'utf8', readComplete)
// fs.writeFile()
// fs.appendFile()
// fs.read()
// fs.mkdir()
