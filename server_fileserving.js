// Require/import the HTTP module
const http = require("http")
const fs = require("fs")

const PORT = 8080

// Create a generic function to handle requests and responses
function incomingAPICall(request, response) {
  console.log( `[incomingAPICall] call: url ${request.url} / ${request.method}` );
  // Send the below string to the client when the user visits the PORT URL

  // serving files from subdirectory called html
  // request.url = '/index.html' --> ...../html/index.html
  // request.url = '/portfolio.html' --> html/portfolio.html

  // get the html from the directory
  const fileName = `${__dirname}/html/` + ( request.url=='/' ? 'index.html' : request.url.substr(1) )
  console.log( `.. user requestsed ${fileName}` )
  let html
  if( !fs.existsSync(fileName) ){
    console.log( `x user filename NOT found, generic error`)
    html = '<html><body>Sorry this file does not exist!</body></html>'
  } else {
    html = fs.readFileSync( fileName, 'utf8' )
    console.log( `* found filename, ${html.length} bytes read` )
  }

  response.end( html )
}

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.
const server = http.createServer( incomingAPICall );

// Start our server so that it can begin listening to client requests.
server.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
