var publicDirectory = './public',
    port = 3000;

var md = require('node-markdown').Markdown,
    static = require('node-static'),
    routil = require('routil'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    url = require('url');

// Checks if public directory exists
fs.exists(publicDirectory, function (exists) {
    if (!exists) {
        console.error('Public directory does not exist.');
        process.exit(1);
    }
});

var file = new(static.Server)(publicDirectory);

// Starts web server
http.createServer(function(req, res) {
    var fileName = url.parse(req.url).pathname;

    // If no URI specified, serve home.
    if (fileName === '/') {
        fileName = '/Home.md';
    }

    // If the request is for a markdown file
    if (path.extname(fileName) === '.md') {
        var filePath = path.join(__dirname, publicDirectory, fileName),
            body = '';
            
        // Checks if URL's md file exists
        fs.exists(filePath, function (exists) {
            if (exists) {
                // Reading file
                fs.readFile(filePath, function(error, data) {
                    if (error) {
                        console.error('Something wrong happened while reading the file: ', filePath);
                    } else {
                        // Converting file's markdown to HTML and serving it.
                        body = md(data.toString());
                        routil.sendHtml(res, body);
                    }
                });
            } else {
                // If no md file is found, serve a 404
                routil.errorPage(req, res, 404);
            }
        });
    } else {
        var thatReq = req,
            thatRes = res;

        // try to find a static file to serve
        file.serve(req, res, function (e, res) {
            // If the file wasn't found, send 404
            if (e && (e.status === 404)) {
                routil.errorPage(thatReq, thatRes, 404);
            }
        });
    }
}).listen(port, function() {
    console.log('Server is started and listening on port ' + port);
});