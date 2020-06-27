
var express = require("express");
var path = require('path')
const cors = require('cors');
const fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
const { timeLog } = require("console");
var uuidv4 = require('uuid').v4;
var app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false, keepExtensions: true }));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp/',
  debug: true
}));
app.get('/', function (req, res) {
  res.send('Welcome to file upload system!');
});
app.use('/api/upload', require('./app/attachment/uploads'));
app.use('/api/file', require('./app/attachment/files'));


const port = 3001;
app.listen(port, function () {
  console.log(`filesystem app listening on port ${port}!`);
});
