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
                    res.end();
                    let d = JSON.parse(fields["data"]);
                    console.log(d);
                    carbone.render(newpath, d, function (err, result) {
                        if (err) return console.log(err);
                        fs.writeFileSync('result.docx', result);
                    });
                });

                // Delete the file
                fs.unlink(oldpath, function (err) {
                    if (err) throw err;
                });
            });
        });
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="file"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8084);