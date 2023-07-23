const http = require('http');
const fs = require('fs');
const routeHandler = require('./routes');

console.log(routeHandler.text);
const server = http.createServer(routeHandler.route);

server.listen(4000);