
var express = require("express");
var fs = require('fs');
var path = require('path')
const cors = require('cors');
// const drivelist = require('drivelist');
const { spawn, exec } = require('child_process');
var df = require('node-diskfree');
// Create a new express application instance
var app = express();
app.use(cors())
app.get('/', function (req, res) {
    //res.send('Hello World!');
    // drivelist.list().then((driveList)=>{
    //     res.send(driveList);
    // });
    // drives.forEach((drive) => {
    // console.log(drive);
    // });
    
});

app.get('/dir/:Drive', function (req, res) {
    var basePath = req.params.Drive + ":/";
    var reqPath = req.query.path;
    if (reqPath) {
        basePath = basePath + reqPath;
    }
    fs.readdir(basePath, function (err, files) {
        if (err) {
            res.send(err.message);
        }
        //listing all files using forEach
        var directoryList = [];
        // console.log(files);
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            // var _fullPath = basePath;
            if (reqPath) {
                _fullPath =  basePath + "/" +  file;    
            } else {
                _fullPath = basePath + file;
            }
            
            
            statSync(_fullPath, (resp)=>{
                var val = {
                    name: file,
                    fullPath: _fullPath,
                    isDirectory: resp.isDirectory(),// fs.statSync(_fullPath).isDirectory(),
                    isFile: resp.isFile(), // fs.lstatSync( _fullPath ).isFile(),
                    ext: path.extname(_fullPath)
                }
                directoryList.push(val);
            })

        });
        
        if (directoryList.length > 0) {
            res.send(directoryList);    
        } else {
            res.send("This folder is empty!!!");
        }

        function statSync(path, cb, eb){
            try {
                var sss = fs.statSync(path)
                cb(sss);
            } catch (error) {
                if (eb) {
                    eb(error);    
                }
                
            }
        }
        
    });
});

app.get('/gets', function(req, res){
    exec('ipconfig', (err, stdout, stderr) => {
        if (err) {
          res.send(err);
        }
        res.send(stdout);
      })
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
