var express = require('express');
var router = express.Router();
const fs = require('fs');

const db = require('../db');

router.post('/hostMeal', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    const newFilePath = req.file.destination + Date.now() + req.file.originalname;
    // console.log(newFilePath);
    const picture = newFilePath.slice(8);
    // console.log(picture);
    fs.rename(req.file.path, newFilePath, (err) => { if (err) throw err });

    const {time, date, address, zipcode, title, description, user_id, portions, price, dineIn, pickUp} = req.body
    // const dbTime ='2019-10-07 23:04:53'

    // YYYY-MM-DD hh:mm:ss'
    // 08:49 PM Tue Oct 15 2019 00:00:00 GMT-0400 (Eastern Daylight Time)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // newTime = time.split('').map((item, i) => `${item} ${i}`)
    // console.log(newTime)

    // console.log(time.slice(6,8))

    // console.log('month')
    // console.log(months.indexOf(date.slice(4,7)) + 1)

    let datetimeYear = date.slice(11,15)
    let datetimeMonth = months.indexOf(date.slice(4,7)) + 1
    let datetimeDay = date.slice(8,10)

    let datetimeHour = time.slice(0,2)
    let datetimeMinute = time.slice(3,5)

    if (time.slice(6,8) === 'PM') {
        newDatetimeHour = parseInt(datetimeHour) + 12 
    } else {
        newDatetimeHour = datetimeHour
    }


    datetimeDate = `${datetimeYear}-${datetimeMonth}-${datetimeDay}`
    datetimeTime = `${newDatetimeHour}:${datetimeMinute}:00`

    const dbTime = datetimeDate + ' ' + datetimeTime
    console.log(dbTime)
    const tags = ''
    // res.send('hi')

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
