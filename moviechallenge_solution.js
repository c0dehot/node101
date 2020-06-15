const axios = require("axios");
const inquirer = require("inquirer");

/*
REMEMBER: axios.get && inquirer.prompt BOTH return promises

Your challenge:
Ask the user for a movie name,
... await the user input

THEN get the movie info
... await it's response and display:
movie Title & Actors!

... wait 5 seconds, then ask if they want to try another one
*/

// from waitfor.js
function waitFor(seconds, resolve) {
    return new Promise( function( resolve, reject ){
      if (isNaN(seconds) || seconds < 1) {
          
        // reject seems to create an "error" but it's localized
        return reject( Error("Parameter 'seconds' must be a positive number!") );
      }
  
      setTimeout(function() {
        resolve( null, "Success!" );
      }, seconds * 1000);
    })
}

const movieUrl = 'https://www.omdbapi.com/?apikey=trilogy'

async function mainApp() {
    let repeatLoop = true

    while( repeatLoop ){
        // loop starts here... (and will repeat at end as long as 'repeatLoop' is true)
        const response = await inquirer.prompt({
        message: "Search a movie:",
        name: "movie"
        });

        const movieResult = await axios.get( `${movieUrl}&t=${response.movie}`)
        // display Title + Actors
        const movieData = movieResult.data
        console.log( `Movie: ${movieData.Title}, Actors: ${movieData.Actors} ` )

        setTimeout( function(){ console.log( `we have waited 5 secnods`)}, 5000 )
        // REPEAT RECURSIVELY (weaker solution)
        // setTimeout( function(){
        //     mainApp()
        // }, 5000 )

        // wait 5s (syncronously)
        await waitFor(5)
        // only run AFTER 5 seconds

        // while loop will repeat (OPTIONAL)...
        const repeatResponse = await inquirer.prompt({
            message: "Do you want to run again (yes,no,quit)? :",
            name: "runAgain"
            });
            
        if( repeatResponse.runAgain.toLowerCase() == 'quit' ){
            // quit so kill our node process (no would quit too, but this is showing another option)
            process.exit()
            
        } else if( repeatResponse.runAgain.toLowerCase() !== 'yes' ) {
            // not yes, so stop loop
            repeatLoop = false
        }
    }

}

mainApp()