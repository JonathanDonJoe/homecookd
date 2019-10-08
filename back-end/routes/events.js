var express = require('express');
var router = express.Router();

const db = require('../db');

router.post('/hostMeal', function(req, res, next) {
  console.log(req.body)
  console.log(req.file)
  res.send('respond with a resource')
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
