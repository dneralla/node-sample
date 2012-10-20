/**
 * New node file
 */
console.log("This is the start of something good.");
// Include http module.
var http = require("http");
url = require("url");

mysql = require("mysql");
// Create the connection.
// Data is default to new mysql installation and should be changed according to your configuration.
var connection = mysql.createConnection({
   user: "root",
   password: "Djtrump12",
   database: "dev"
});
// Create the server. Function passed as parameter is called on every request made.
// request variable holds all request parameters
// response variable allows you to do anything with response sent to the client.
http.createServer(function (request, response) {
   // Attach listener on end event.
   // This event is called when client sent all data and is waiting for response.
   request.on("end", function () {
      
      // Query the database.
      connection.query('SELECT * FROM sample;', function (error, rows, fields) {
         response.writeHead(200, {
            'Content-Type': 'x-application/json'
         });
         // Send data as JSON string.
         // Rows variable holds the result of the query.
         response.end(JSON.stringify(rows));
      //var _get = url.parse(request.url, true).query;
      //response.writeHead(200, {
        // 'Content-Type': 'text/plain'
      });
      // Send data and end response.
      //response.end('Here is your data: ' + _get['data']);
   });
// Listen on the 8080
}).listen(8080);