var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 8888,
    pathToFolder = "webapp/static/html",
    pathToRes = "webapp/static";

http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;


    //Check if we want a resource element
    var regex = "/resources(.*)/";
    if(uri.match(regex)) {
        var res = uri.substring(10)
            , filename = path.join(process.cwd(), pathToRes + res);
    } else {
        var filename = path.join(process.cwd(), pathToFolder + uri);
    }
    console.log(filename);
    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");