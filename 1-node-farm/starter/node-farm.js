const http = require('http');
const fs = require('fs');
const url = require('url');

// Read API DATA
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
    if (err) return console.log(err);
});

const dataObj = JSON.parse(data);

// READ TEMPLATES
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8', (err, data) => {
    if (err) return console.log(err);
});
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
    if (err) return console.log(err);
});
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8', (err, data) => {
    if (err) return console.log(err);
});

const replaceTemplate = require('./modules/replaceTemplate');

//CREATE SERVER
const server = http.createServer((req, res) => {
    const path = req.url;
    const { query, pathname } = url.parse(path, true);
    //OVERVIEW PAGE
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%template_cards%}', cardsHtml)
        res.end(output);
    }

    //PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    }

    // API ROUTE    
    else if (pathname === "/api") {
        res.writeHead(200, {
            'Content-type': 'application/json',
            'my-custom-header': 'Hello world'
        });
        res.end(data);
    }

    // PAGE NOT FOUND 404     
    else {
        res.writeHead(404);
        res.end("Page requested not found");
    }

})

server.listen(8888, '127.0.0.1', () => {
    console.log("Starting server at 127.0.0.1:8888 ...");
})