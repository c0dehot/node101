// Require/import the HTTP module
const http = require("http");
const PORT = 7000;

// Create a generic function to handle requests and responses
function incomingAPICall(request, response) {
  console.log( `[incomingAPICall] call: url ${request.url} / ${request.method}` );
  // Send the below string to the client when the user visits the PORT URL

  let pageHtml = '<html><body>'
  if( request.url=='/index.html' || request.url=='/' ){
    pageHtml += `<h1>My HomePage</h1><p>This is stuff about me. 
                 <a href='/hobbies.html'>Hobbies</a>
                 </p>`
  } else if( request.url=='/hobbies.html' ){
    pageHtml += `<h1>Hobbies</h1>
      <p>My hobbies are: .....</p>`
  }
  response.end( pageHtml )
}

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.
const server = http.createServer( incomingAPICall );
console.log( `... just created the server, from the http.createServer method` )

// Start our server so that it can begin listening to client requests.
server.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
