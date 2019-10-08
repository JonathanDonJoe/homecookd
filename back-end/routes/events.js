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


/* GET events listing. */
router.get('/', function (req, res, next) {
    const getEventQuery = `
    SELECT * 
    FROM events
    WHERE time > CURRENT_TIMESTAMP ;
    `
    db.query(getEventQuery,(err, result)=>{
      if(err) throw err;
      console.log(result)
      res.json(result)
    })
  })

router.get('/:eventId',(req, res)=>{
    const eventId = req.params.eventId;
    const getEventQuery = `
    SELECT events.id AS event_id, events.address AS event_address, events.description AS event_description, 
    events.dine_in AS event_dine_in, events.host_id AS host_id, events.pick_up AS event_pick_up, 
    events.picture AS event_picture, events.portions AS event_portions, events.price AS event_price,
    events.time AS event_time, events.title AS event_title, users.id AS users_id, users.first_name AS users_name,
    users.picture AS users_picture, host_reviews.title AS review_title, host_reviews.review AS review_content, 
    host_reviews.stars AS review_stars, host_reviews.reviewed_id AS reviewed_id
    FROM events, users, host_reviews
    WHERE events.host_id = users.id and users.id = host_reviews.reviewed_id and events.id = ?;
    `
    db.query(getEventQuery,[eventId],(err, result)=>{
      if(err) throw err;
      console.log(result)
      res.json(result)
    })
  })


module.exports = router;
