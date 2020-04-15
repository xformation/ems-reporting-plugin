var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
const carbone = require('carbone');

http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.file.path;
            var newpath = 'E:/GIT/carbone-js-server/files/' + files.file.name;
            fs.readFile(oldpath, function (err, data) {
                if (err) throw err;
                fs.writeFile(newpath, data, function (err) {
                    if (err) throw err;
                    let fData = JSON.parse(fields["data"]);
                    var options = {
                        convertTo: 'pdf'
                    };
                    carbone.render(newpath, fData, options, function (err, result) {
                        if (err) return console.log(err);
                        res.writeHead(200, {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': 'attachment; filename=some_file.pdf',
                            'Content-Length': result.length
                        });
                        //delete the new file
                        fs.unlink(newpath, function (err) {
                            if (err) throw err;
                        });
                        res.end(result);
                    });
                });

                // Delete the old file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                });
            });
        });
    }
}).listen(8084);