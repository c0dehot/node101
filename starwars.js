// Dependencies
// ===========================================================
const express = require("express");

const app = express();
const PORT = 3000;

// look in 'html' FIRST and serve any static file
app.use(express.static('html'))
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//
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
function checkAuthorization(req,res,next ){
  console.log( `[checkAuthorization] called ` )
  if( req.url !== '/' ){
    res.send("Sorry you can't go there")
    return
  }
  next()
}

app.get(["/","/hobbies","/edit"], checkAuthorization, function(req, res) {
  console.log( `[/ called] showing data ` )
  res.send("Welcome to the Star Wars Page!");
});

app.get("/character/:name", function(req, res) {
  req.params = {
    name: "obiwan"
  }
  // /characters/obiwan/5000
  const name = req.params.name 
  console.log( `[/${name} called] showing ${name} object data ` )
  if( characters.hasOwnProperty(name) ){
    res.send(characters[name]);
  } else {
    res.send( { error: "No character found" } )
  }
});

// to change a characters age
app.get("/character/:name/:age", function(req, res) {
  const name = req.params.name 
  const age = req.params.age
  // /characters/obiwan/5000
  if( characters.hasOwnProperty(name) ){
    characters[name].age = req.params.age;
    console.log( `age changed for: `, characters[name] )
  }
  res.send( { name, message: `Changed age to ${req.params.age}` } )
});

app.post( "/api/edit-character", function( req, res ){
  // req.body
  console.log( req )

  const newCharacter = req.body
  console.log( `newCharacter: `, newCharacter )

  characters[newCharacter.name] = newCharacter
  console.log( `characters: `, characters )

  res.send( { status: true, message: `Cool beans, we save it for you` } )
})
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


