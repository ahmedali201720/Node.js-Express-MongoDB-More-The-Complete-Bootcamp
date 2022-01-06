//Create server
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    console.log(req.url);
    const pathName = req.url;
    if (pathName === '/overview' || pathName === '/')
        res.end("Hello from the server");
    else if (pathName === '/product')
        res.end("Welcome to product page")
    else {
        // Status code must be set before response is sent.
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'Hello world'
        });
        res.end("<h1>Page Not found</h1>");
    }
})

server.listen(8888, '127.0.0.1', () => {
    console.log('Listening to Server on port 8888 -- 127.0.0.1:8888');
})