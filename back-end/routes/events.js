var express = require('express');
var router = express.Router();
const fs = require('fs');

const db = require('../db');

router.post('/hostMeal', function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    const newFilePath = req.file.destination + Date.now() + req.file.originalname;
    console.log(newFilePath);
    const picture = newFilePath.slice(8);
    console.log(picture);
    fs.rename(req.file.path, newFilePath, (err) => { if (err) throw err });

    const {time, date, address, zipcode, title, description, user_id, portions, price, dineIn, pickUp} = req.body
    const dbTime ='2019-10-07 23:04:53'
    const tags = ''


    const insertEventQuery = `
        INSERT INTO events
        (time, address, zipcode, title, description, host_id, portions, price, tags, picture, dine_in, pick_up)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
    const dine_in = dineIn === 'false' ? false : true
    const pick_up = pickUp === 'false' ? false : true
    
    const dbValues = [dbTime, address, zipcode, title, description, user_id, portions, price, tags, picture, dine_in, pick_up];

    db.query(insertEventQuery, dbValues, (err) => {
        if (err) throw err;
        res.json( {
            msg: 'eventCreated'
        })
    })

})


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
