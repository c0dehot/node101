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

const movieUrl = 'https://www.omdbapi.com/?apikey=trilogy'

async function mainApp() {
    <<<...>>> inquirer.prompt({
      message: "Search a movie:",
      name: "movie"
    });

    <<<...>>> axios.get( `${movieUrl}&t=${movie}`)

    // wait 5s
    // repeat?
}

mainApp()