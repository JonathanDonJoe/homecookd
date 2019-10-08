var express = require('express');
var router = express.Router();
const fs = require('fs');

const db = require('../db');

router.post('/hostMeal', function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    const newFilePath = req.file.destination + Date.now() + req.file.originalname;
    console.log(newFilePath);
    const filePathForDb = newFilePath.slice(8);
    console.log(filePathForDb);
    fs.rename(req.file.path, newFilePath, (err) => { if (err) throw err });
    res.send('respond with a resource')
})


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
