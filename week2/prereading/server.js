let http = require('http');

http.createServer(function (request, response) {
    console.log('request ', request.url);
    let d = new Date();
    let currentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds();
    response.writeHead(200);
    response.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Love Letter</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #fef6e4;
                    color: #001858;
                    padding: 40px;
                }
                h1 {
                    color: #f582ae;
                }
                .timestamp {
                    font-style: italic;
                    color: #8bd3dd;
                }
            </style>
        </head>
        <body>
            <h1>Hello from the other side of the couch</h1>
            <p class="timestamp">At ${currentTime} I am thinking about ur boobs</p>
            <p>I made this website as my expression of my love for you.</p>
        </body>
        </html>
    `);
    response.end();
}).listen(8080);
console.log('Server running at http://localhost:8080/');