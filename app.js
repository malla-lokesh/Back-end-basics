const http = require('http');

const server = http.createServer((req, res) => {
    console.log('server created!');
})

server.listen(4000);