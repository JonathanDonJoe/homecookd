var express = require('express');
var router = express.Router();
const fs = require('fs');

const db = require('../db');

/* POST events listing. */
router.post('/hostMeal', function (req, res, next) {
    // console.log(req.body)
    // console.log(req.file)
    const newFilePath = req.file.destination + Date.now() + req.file.originalname;
    // console.log(newFilePath);
    const picture = newFilePath.slice(8);
    // console.log(picture);
    fs.rename(req.file.path, newFilePath, (err) => { if (err) throw err });

    const { time, lat, lng, date, realAddress, title, description, user_id, portions, price, dineIn, pickUp } = req.body
    // const dbTime ='2019-10-07 23:04:53'

    // YYYY-MM-DD hh:mm:ss'
    // 08:49 PM Tue Oct 15 2019 00:00:00 GMT-0400 (Eastern Daylight Time)

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // newTime = time.split('').map((item, i) => `${item} ${i}`)
    // console.log(newTime)

    // console.log(time.slice(6,8))

    // console.log('month')
    // console.log(months.indexOf(date.slice(4,7)) + 1)

    let datetimeYear = date.slice(11, 15)
    let datetimeMonth = months.indexOf(date.slice(4, 7)) + 1
    let datetimeDay = date.slice(8, 10)

    let datetimeHour = time.slice(0, 2)
    let datetimeMinute = time.slice(3, 5)

    if (time.slice(6, 8) === 'PM') {
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
        (time, address, lat, lng, title, description, host_id, portions, price, tags, picture, dine_in, pick_up)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `
    const dine_in = dineIn === 'false' ? false : true
    const pick_up = pickUp === 'false' ? false : true
    console.log(`realAddress is ${realAddress}`)
    const dbValues = [dbTime, realAddress, lat, lng, title, description, user_id, portions, price, tags, picture, dine_in, pick_up];

    db.query(insertEventQuery, dbValues, (err, resp) => {
        if (err) throw err;
        // console.log(resp)
        const insertAttendanceQuery = `
            INSERT INTO attendances
            (user_id, event_id, paid, dine_in, pick_up)
            VALUES (?, ?, ?, ?, ?);
        `
        insertAttendanceQueryValues = [parseInt(user_id), resp.insertId, 0, 0, 0]
        console.log(insertAttendanceQueryValues)
        db.query(insertAttendanceQuery, insertAttendanceQueryValues, (err) => {
            if (err) throw err;
            res.json({
                msg: 'eventCreated'
            })
        })
    })

})


/* GET events listing. */
router.get('/', function (req, res, next) {
    const getEventQuery = `
        SELECT * 
        FROM events
        WHERE time > CURRENT_TIMESTAMP ;
    `
    db.query(getEventQuery, (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json(result)
    })
})

router.post('/getUserEvents', (req, res) => {
    console.log(res.locals.uid)
    const getUserEventsQuery = `
        SELECT *
        FROM events, attendances
        WHERE events.id = attendances.event_id
            AND user_id = ?
    `

    db.query(getUserEventsQuery, [res.locals.uid], (err, result) => {
        if (err) throw err;
        console.log('result')
        console.log(result)
        res.json(result)
    })
})

router.get('/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const getEventQuery = `
    SELECT events.id AS event_id, events.lat, events.lng, events.address AS event_address, events.description AS event_description, 
    events.dine_in AS event_dine_in, events.host_id AS host_id, events.pick_up AS event_pick_up, 
    events.picture AS event_picture, events.portions AS event_portions, events.price AS event_price,
    events.time AS event_time, events.title AS event_title, users.id AS users_id, users.first_name AS users_name,
    users.picture AS users_picture, host_reviews.title AS review_title, host_reviews.review AS review_content, 
    host_reviews.stars AS review_stars, host_reviews.reviewed_id AS reviewed_id
    FROM events, users, host_reviews
    WHERE events.host_id = users.id and users.id = host_reviews.reviewed_id and events.id = ?;
    `
    db.query(getEventQuery, [eventId], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.json(result)
    })
})


module.exports = router;
