const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    const body = [];

    if (url === '/') {
        fs.readFile('inputMessage.txt', (err, data) => {
            if (err) console.log(err);
            console.log(`data from file: ${data}`);
            res.write('<html>');
            res.write('<head><title>writing and reading from a file</title></head>');
            res.write('<body>');
            res.write(`<div>${data}</div>`);
            res.write('<form action="/message" method="POST"><input type="text" name="message"/><button>send</button></form></body>');
            res.write('</html>');
            return res.end();
        });
    } else if (url === '/message' && method==='POST') {
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('inputMessage.txt', message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }
})

server.listen(4000);