// OBJECTIVE
// Make a restaurant reservation system that:
//    - Accepts user reservations (name, phone, email, id)
//    - Display reservation list
//          - first 5 are "active reservations"
//          - beyond this are "waitinglist" reservations


// SCOPE
// - build 3 html pages
//   + landing page with 2 buttons
//   + list of the reservation / waitlists
//   + make-reservation form

// WALKTHROUGH for MAKE_RESERVATION
// Go to URL:
// localhost:8080/reserve.html
// Show the form
// Name     [       ]
// Email    [       ]
// Phone    [       ]
// ID       [  ]
//                      [RESERVE]
// 
// When user clicks [RESERVE]
//    1. Gathers all the reservation info into an object
//       { name: ..., email: ..., phone: ... }
//    2. POST that object information to the node SERVER, ex.
//       fetch( "/api/reserve", 
//            {method: 'post',headers: {'Content-Type': 'application/json'}} )
//    3. Add the '/api/reserve' POST endpoint to your server
//    4. Fix up the logic on the serve to save that reservation to a global list

// WALKTHROUGH for TABLE LISTING
// GO to URL:
// localhost:8080/tables.html
// Shows 2 lists of tables
//   First 5 entries appear in a "Current Reservations"
//   Any remaining entries appear as "Waiting List"
// HOW?
// When the page loads, we want to get the list of tables from the server
// const tableList = await fetch( '/api/tables' ).then( result=>result.json() )
// const tableList = [ { name: ..., email: ..., id: 'table-1' }, { name: ..., email: ..., id: 'table-2' } ]
// Now with this tableList


















const express = require("express");

const app = express();
const PORT = 3000;

// look in 'html' FIRST and serve any static file
app.use(express.static('html'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const tableList = [ 
    { name: "george", email: "george@clooney.com", id: 'table-1' }, 
    { name: "Jeff", email: "jeff@bezos.com", id: 'table-2' } 
]

app.get("/api/tables", function(req, res) {
  // show active tables
  res.send( tableList )
});


app.post( "/api/reserve", function( req, res ){
  // req.body
  const newReservation = req.body
  tableList.push( newReservation )
  
  console.log( tableList )
  
  res.send( { status: true, message: `Cool beans, we save it for you` } )
})
// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


