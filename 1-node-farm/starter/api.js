const http = require('http');
const fs = require('fs');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8', (err, data) => {
    if (err) return console.log(err);
    const jsonData = data;
});
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const path = req.url;
    if (path === '/' || path === '/overview') {
        res.end("Welcome to home page");
    }
    else if (path === '/product') {
        res.end("Welcome to product page.")
    }
    else if (path === "/api") {
        res.writeHead(200, {
            'Content-type': 'application/json',
            'my-custom-header': 'Hello world'
        });
        res.end(data);
    }
    else {
        res.writeHead(404);
        res.end("Page requested not found");
    }
})

server.listen(8888, '127.0.0.1', () => {
    console.log("Starting server at 127.0.0.1:8888 ...");
})