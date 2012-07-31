var md = require('node-markdown').Markdown,
    static = require('node-static'),
    routil = require('routil'),
    fs = require('fs'),
    http = require('http'),
    path = require('path'),
    url = require('url');

var gollum = function(publicDirectory, port) {
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
        var filePath = path.join(__dirname, publicDirectory, fileName),
            body = '';
            
        // Checks if URL's md file exists
        fs.exists(filePath, function (exists) {
            if (exists) {
                // Reading file
                fs.readFile(filePath, function(error, data) {
                    if (error) {
                        var thatReq = req,
                            thatRes = res;

                        // try to find a static file to serve
                        file.serve(req, res, function (e, res) {
                            // If the file wasn't found, send 404
                            if (e && (e.status === 404)) {
                                routil.errorPage(thatReq, thatRes, 404);
                            }
                        });
                    } else {
                        // Converting file's markdown to HTML and serving it.
                        body = md(data.toString());
                        routil.sendHtml(res, body);
                    }
                });
            }
        });
    }).listen(port, function() {
        console.log('node-gollum server started on port ' + port);
    });
};

gollum('./public', 3000);