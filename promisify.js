const fs = require("fs");
const util = require("util");

  // The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const version = "await" // then
// since we have promises now, we can use .then 
// .THEN
if( version=='then' ){
  readFilePromise("animals.json", "utf8")
    .then(function(data) {
      // Parse the JSON string to an object
      const animalJSON = JSON.parse(data);

      // Create two new arrays to contain the cats and dogs objects
      const dogs = [];
      const cats = [];

      // For each element in animal
      animalJSON.forEach(function(animal) {
        if (animal.species === "dog") {
          dogs.push(animal);
        } else if (animal.species === "cat") {
          cats.push(animal);
        }
      });

      // Turn the arrays into JSON strings so they can be written to files
      const dogJSON = JSON.stringify(dogs, null, 2);
      const catJSON = JSON.stringify(cats, null, 2);

      writeFilePromise("dogs.json", dogJSON).then(function() {
        console.log("Successfully wrote to dogs.json file");
      });

      writeFilePromise("cats.json", catJSON).then(function() {
        console.log("Successfully wrote to cats.json file");
      });
    });
  } else if( version=='await' ){
    // AWAIT
    async function mainApp(){
      const data = await readFilePromise("animals.json", "utf8")

      const animalJSON = JSON.parse(data);
      const dogs = [];
      const cats = [];

      animalJSON.forEach(function(animal) {
        if (animal.species === "dog") {
          dogs.push(animal);
        } else if (animal.species === "cat") {
          cats.push(animal);
        }
      });

      const dogJSON = JSON.stringify(dogs, null, 2);
      const catJSON = JSON.stringify(cats, null, 2);

      let result
      result = await writeFilePromise("dogs.json", dogJSON)
      console.log( `Successfully wrote to dogs.json` )

      result = await writeFilePromise("cats.json", catJSON)
      console.log("Successfully wrote to cats.json file");
    }
    mainApp()
  }