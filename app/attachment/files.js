var express = require('express');
const router = express.Router();
var fs = require('fs');
const config = require('../config');
const uploadedFolderPath = './' + config.uploadFolderName + '/';

router.get('/:name', function (req, res) {
  const _name = req.params.name;
  fs.readdir('./' + config.uploadFolderName + '/', function (err, files) {
    if (err) { res.send(err) }
    const file = files.find(item => item === _name);
    //console.log(files.find(item=>item.startsWith(_id)))
    res.sendfile('./' + config.uploadFolderName + '/' + file);
  })
  
  // res.sendfile('./file/' + .startsWith(req.param.id));
});
// var files = fs.readdirSync(uploadedFolderPath);
// console.log(files.find(item => item.startsWith('5d430d29-04ae-4eb3-bc8f-c48331038307_spiderman')))

// const files = fs.readdirSync(uploadedFolderPath);
//   const file = files.find(item => item.startsWith('5d430d29-04ae-4eb3-bc8f-c48331038307_spiderman'));
//   console.log(file)
//   if (file !== undefined) {
//     fs.unlink(`${uploadedFolderPath}/${file}`, (err) => {
//       if (err) throw err;
//       return 1;
//     })
//   } else {
//     return "deleted";
//   }
  
  
router.delete('/:id', function (req, res) {
  const files = fs.readdirSync(uploadedFolderPath);
  const file = files.find(item => item.startsWith(req.params.id));
  if (file) {
    fs.unlink(`${uploadedFolderPath}/${file}`, (err) => {
      if (err) throw err;
      res.send({status: 200, message: 'deleted'});
    })
  } else {
    res.send({status: 404, message: 'not found'})
  }
  // fs.unlink(uploadedFolderPath + , (err) => {
  //   if (err) throw err;
  //   console.log('successfully deleted /tmp/hello');
  // });
});


module.exports = router;


