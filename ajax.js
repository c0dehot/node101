const axios = require("axios");
const fetch = require('node-fetch')

const url = "https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy"

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

