// Create simple server

const http = require('http');

//Take 2 obj (request and response)
const server = http.createServer((req, res) => {
    res.end("Hello from the server");
})

server.listen(8888, '127.0.0.1', () => {
    console.log('Listening to requests on port 8808');
});