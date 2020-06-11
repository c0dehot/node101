const fs = require('fs') // fs | http 

function readComplete( err, data ){
    if( err ){
        console.log( `Sorry something went wrong.` )
        return;
    }

    console.log( `Finished reading: '${data}'` )
}

async function mainApp(){
    console.log( `starting mainApp ` )
    let result = await fs.readFile('README.md', 'utf8', readComplete)
    console.log( `We read the file`, result )
}
mainApp()

// fs.writeFile()
// fs.appendFile()
// fs.read()
// fs.mkdir()
