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

const notesList = [ 
    { title: "note title", info: "some note info", id: 66 }
]


app.get("/api/notes", function(req, res) {
  // send back the list of notes
  res.send( notesList )
});

app.get("/api/notes/:id", function(req, res) {
  // send back the list of notes
  const noteId = req.params.id
  const singleNote = notesList.filter( note=>note.id == noteId )
  res.send( singleNote )
});

app.delete("/api/notes/:id", function(req, res) {
  // send back the list of notes
  const noteId = req.params.id
  const updatedNotesList = notesList.filter( note=>note.id !== noteId )
  notesList = updatedNotesList
  res.send( { status: true, message: `Deleted note ${noteId}` } )
});

app.post( "/api/notes", function( req, res ){
  // req.body
  const newNote = req.body

  // check this id does not exist yet
  if( notesList.findIndex( note=>note.id == newNote.id )>-1 ){
    console.log( `x sorry but POST was denied as the note id already exists (id=${newNote.id})` )
    // could set HTTP response code too [ex. 400 Bad Request]
    res.status(400).send( { status: false, message: `Sorry that note id already exists. Can't create it.` } )
  }

  notesList.push( newNote )
  
  console.log( notesList )  
  res.send( { status: true, message: `Cool beans, we save it for you` } )
})

app.put( "/api/notes", function( req, res ){
  // req.body
  const revisedNote = req.body
  if( !revisedNote.id ){
    console.log( `couldn't update that note, as id was missing!~ quitting` )
    res.send( { status: false, message: `Missing the id from the update, could not update` } )
  }

  // find which note to update
  const noteIdx = notesList.findIndex( note=>note.id == revisedNote.id )
  notesList[noteIdx] = revisedNote
  
  console.log( notesList )  
  res.send( { status: true, message: `Cool beans, we updated note #${revisedNote.id}` } )
})


// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


