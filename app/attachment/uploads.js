var express = require('express');
const router = express.Router();
const uuidv4 = require('uuid').v4;
const config = require('../config');

router.post('/', function (req, res) {
    const file = req.files.sampleFile;
    // console.log(file); // the uploaded file object
    const uId = uuidv4();
    const fileName = file.name;
    // const uploadPath = __dirname + '/' + config.uploadFolderName + '/' + fileName;
    // const uploadPath = './' + config.uploadFolderName + '/' + fileName;
    const newFileName = `${uId}_${fileName}`;
    const uploadPath = `./${config.uploadFolderName}/${uId}.${getExtension(fileName)}`;
    const filefullPath = uploadPath;
    file.mv(filefullPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.send({
        // input: file,
        // output: {
          id: uId,
          name: fileName,
          filelocation: {
              method: 'GET',
              path: `http://${config.host}:${config.port}${config.basePath}/file/${newFileName}`
          }
        // }
      })
    });
    function getExtension(fileName){
      var fileNameSplit = fileName.split('.')
      var ext = fileNameSplit[fileNameSplit.length - 1]
      return ext;
    }
  });

  module.exports = router;