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
    const uploadPath = './' + config.uploadFolderName + '/' + fileName;
    const filefullPath = uploadPath;
    file.mv(filefullPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
  
      res.send({
        input: file,
        output: {
          id: uId,
          name: fileName,
          filelocation: {
              method: 'GET',
              path: `http://localhost:3001/api/file/${fileName}`
          }
        }
      })
    });
  
  });

  module.exports = router;