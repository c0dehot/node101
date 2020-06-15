// Dependencies
// ===========================================================
const express = require("express");

const app = express();
const PORT = 3000;

// Data
// ===========================================================
const characters = {
  yoda:   {
            name: "Yoda",
            role: "Jedi Master",
            age: 900,
            forcePoints: 2000
          },
  darthmaul: {
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
      },
  obiwan: {
        name: "Obi Wan",
        role: "Jedi Master",
        age: 57,
        forcePoints: 1500
      }
};

// Routes
// ===========================================================
app.get("/", function(req, res) {
  console.log( `[/ called] showing data ` )
  res.send("Welcome to the Star Wars Page!");
});

// to change a characters age
app.get("/character/:name/:age", function(req, res) {
  const name = req.params.name 
  // /characters/obiwan/5000
  if( characters.hasOwnProperty(name) ){
    characters[name].age = req.params.age;
    console.log( `age changed for: `, characters[name] )
  }
  res.send( { name, message: `Changed age to ${req.params.age}` } )
});

app.get("/character/:name", function(req, res) {
  // /characters/obiwan/5000
  const name = req.params.name 
  console.log( `[/${name} called] showing ${name} object data ` )
  if( characters.hasOwnProperty(name) ){
    res.send(characters[name]);
  } else {
    res.send( { error: "No character found" } )
  }
});
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


