var express = require('express');
const router = express.Router();
var fs = require('fs');
const config = require('../config');

router.get('/:name', function (req, res) {
    const _name = req.params.name;
    fs.readdir('./'+ config.uploadFolderName +'/', function (err, files) {
      if (err) { res.send(err) }
      const file = files.find(item => item === _name);
      //console.log(files.find(item=>item.startsWith(_id)))
      res.sendfile('./'+ config.uploadFolderName +'/' + file);
    })
    // res.sendfile('./file/' + .startsWith(req.param.id));
  });  

  module.exports = router;