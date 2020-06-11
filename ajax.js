// WHAT IS NODE
// Node = browser javascript engine, WITHOUT the browser
//        - write normal JAVASCRIPT files and they will run on the computer you execute them...
//          which would normally be a server, giving API data back to a client.

// Difference between node & browser
// Browser has the 'DOM', and 2 global objects:
//    window.xxxxxx   - accessing teh browser environment (where browser is placed, screen size, etc)
//    document.xxxxxx - for accessing the DOM
//
// Node does not have these, but it has a global object:
//   process.xxxxxxx  - for accessing the server environment
//     process.argv   - for getting command line parameters
//     process.env    - for getting environmental variables    

const axios = require("axios");
const fetch = require('node-fetch')
// dotenv to automically pull the environment variables from a secret file.

const apiKey = process.env.APIKEY
if( !apiKey ){
  console.log( `Please enter an APIKEY before node, ex. APIKEY=test123 node ajax.js`)
  process.exit()
}

const url = `https://www.omdbapi.com/?t=The%20Matrix&apikey=${apiKey}`

// #1 with .then
axios.get(url)
  .then(function(result) {
    console.log(`result from .then on axios.get(): `, result.data);
  });


async function mainApp(){
  // #2 using await + axios
  const result = await axios.get(url)
  console.log(`result from await axios.get()`, result.data );

  // #3 await + fetch
  const result2 = await fetch(url).then( response=>response.json() )
  console.log( `result from fetch: `, result2 )
}
mainApp()

