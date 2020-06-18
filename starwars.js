// Dependencies
// ===========================================================
const express = require("express");

const app = express();
const PORT = 3000;

// look in 'html' FIRST and serve any static file
app.use(express.static('html'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
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

app.get("/character/:name", function(req, res) {
  // /character/obiwan  --> req.params = { name: "obiwan" }
  const name = req.params.name 
  console.log( `[/${name} called] showing ${name} object data ` )
  if( characters.hasOwnProperty(name) ){
    res.send(characters[name]);
  } else {
    res.send( { error: "No character found" } )
  }
});

app.get("/api/character-list", function( req, res ){
  res.send( characters )
})

app.get( "/api/new-character/:name/:role/:age", function( req, res ){
  // req.body
  const newCharacter = {
    name: req.params.name,
    role: req.params.role,
    age: req.params.age,
    forcePoints: 500
  }
  // regex removes any non-alpha characters
  // convert "Darth Sidius" => darthsidius
  // convert Luke 'cool' WALKER => lukecoolwalker
  const nameKey = newCharacter.name.toLowerCase().replace(/[\s0-9"'_+]/g,'')

  characters[nameKey] = newCharacter
  console.log( `characters: `, characters )

  res.send( { status: true, message: `Cool beans, we save it for you` } )
})


app.post( "/api/edit-character", function( req, res ){
  // req.body
  const newCharacter = req.body
  // regex removes any non-alpha characters
  // convert "Darth Sidius" => darthsidius
  // convert Luke 'cool' WALKER => lukecoolwalker
  const nameKey = newCharacter.name.toLowerCase().replace(/[\s0-9"'_+]/g,'')

  characters[nameKey] = newCharacter
  console.log( `characters: `, characters )

  res.send( { status: true, message: `Cool beans, we save it for you` } )
})
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


