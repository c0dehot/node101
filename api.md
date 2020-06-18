# Restful API CRUD Commands #

Our API will generally do 4 things:
- CREATing objects
- READing objects
- UPDATing objects
- DELETing objects

You want to have a consistent API command hierarchy:
- first the noun of the object
- great specifiers after each slash

GET     /api/users
GET     /api/users/145
DELETE  /api/users/145
GET     /api/users/delete/145
POST    /api/users
PUT     /api/users

# [Client Side] Making CRUD Requests #
const fetchOptions = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: 
}

const saveResult = await fetch( "/api/users/145", fetchOptions )
                    .then( result=>result.json() )

# [Server Side] Receiving CRUD Commands #
You need to specify the METHOD you are listening on.

Functionally, aside the listening end-point method, 
GET + DELETE are the same
POST + PUT are the same

### GET command + endpoint(ex. api path) ##
- used for fetching data from the server
app.get( '/api/users/:id', function( req,res ){ } )

### DELETE commands ###
- used to delete or remove objects from the server
app.delete( '/api/users/:id', function( req,res ){ } )

### POST commands ###
- used for creating new objects
app.post( '/api/users', function (req,res ){} )

### PUT command ###
- used for updating existing objects
app.put( '/api/users', function ( req,res ){} )

