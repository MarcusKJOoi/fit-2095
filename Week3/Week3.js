const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlParse = require('url');
let fileName = 'index.html';

http.createServer((request, response) => {
    const { url, method } = request;
    let pathName = urlParse.parse(url).pathname;

    if(pathName === '/main' && method === 'POST') {
        let body = '';
        // Process all our chunks of data
        request.on('data', chunk => {
            body += chunk.toString();
        }).on('end', () => {
            // Destructure to obtain username and password from the object returned
            const { username, password } = querystring.parse(body);
            if(username === 'admin' && password === 'pass') {
                // 301 for redirect
                response.writeHead(301, {
                    Location: 'http://127.0.0.1:8080/main'
                });
            } else {
                response.writeHead(301, {
                    Location: 'http://127.0.0.1:8080/access_denied'
                });
            }
            response.end();
        })
    }

    // Handle routing and subsequently serving the file
    switch (url) {
        case '/':
            fileName = 'index.html';
            break;
        case '/main':
            fileName = 'mainpage.html';
            break;
        case '/access_denied':
            fileName = 'accessdenied.html';
            break;
        default:
            fileName = 'index.html';
            break;
    }

    // Send the file as a response
    fs.readFile(fileName, (_, content) => {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(content, 'utf-8');
    });
}).listen(8080);
