
const express = require("express");
const path = require('path')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();
const config = require('./app/config');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./app/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.use(config.basePath + '/upload', require('./app/attachment/uploads'));
app.use(config.basePath + '/file', require('./app/attachment/files'));


const port = 3001;
app.listen(port, function () {
  console.log(`filesystem app url: http://localhost:${port}`);
  console.log(`swagger: http://localhost:${port}/api-docs`);
});
