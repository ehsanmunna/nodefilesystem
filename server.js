
var express = require("express");
var fs = require('fs');
var path = require('path')
const cors = require('cors');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid').v4;
var app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: false, keepExtensions:true}));
app.use(bodyParser.json());

app.use(fileUpload());
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/upload', function (req, res) {
  const file = req.files.sampleFile;
  console.log(file); // the uploaded file object
  const uId = uuidv4();
  file.mv('./files/' + renameFile(file,uId) , function(err) {
    if (err)
      return res.status(500).send(err);

    res.send({id: uId});
  });
});

function renameFile(file, renameString){
  let fileExt;
  switch (file.mimetype) {
    case 'image/jpeg':
      fileExt = '.jpg'
      break;
    case 'text/plain':
      fileExt = '.txt'
      break;
    case 'application/pdf':
      fileExt = '.pdf'
      break;
    default:
      fileExt = ''
      break;
  }
  return renameString + fileExt;
}

app.get('/file/:id', function (req, res) {
  const _id = req.params.id;
  fs.readdir('./files/', function(err, files){
    if(err) {console.log(err)}
    const file = files.find(item=>item.startsWith(_id));
    //console.log(files.find(item=>item.startsWith(_id)))
    res.sendfile('./files/' + file);
  })
  // res.sendfile('./file/' + .startsWith(req.param.id));
});

const port = 3001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
