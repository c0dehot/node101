// Dependencies
// ===========================================================
const express = require("express");

const app = express();
const PORT = 3000;

// look in 'html' FIRST and serve any static file
app.use(express.static('html'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const tables = [
  { name: "Default table",
    email: "test@test.com",
    phone: "999-999-9999",
    id: 234 }
]

app.get("/api/tables", function(req, res) {
  // show active tables
});


app.post( "/api/reserve", function( req, res ){
  // req.body
  const newReservation = req.body

  res.send( { status: true, message: `Cool beans, we save it for you` } )
})
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


