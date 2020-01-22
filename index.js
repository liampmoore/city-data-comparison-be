const server = require('./api/server.js');
var express = require("express")
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./server.key', 'utf8');
var certificate = fs.readFileSync('./server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, express());
 
 
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(credentials);
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
 
httpsServer.listen(8443, () => {
  console.log("https server listening")
});

 