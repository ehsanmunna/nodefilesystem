
var express = require("express");
var fs = require('fs');
var path = require('path')
const cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
// app.use(cors())
// app.use(bodyParser.urlencoded({extended: false, keepExtensions:true}));
// app.use(bodyParser.json());

app.use('/api', require('./server1Config'))


const port = 3001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
