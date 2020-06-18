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
    // console.log( `[/api/notes]` )
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


