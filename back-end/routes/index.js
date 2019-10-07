var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const db = require('../db');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://dev-ag0cp9dk.auth0.com/.well-known/jwks.json`
    }),
    audience: `1GhYuE5mUY005Y6imP9Auc2R7smNW848`,
    issuer: `https://dev-ag0cp9dk.auth0.com/`,
    algorithms: [`RS256`]
})

router.post('*', checkJwt, (req, res, next) => {
    const email = req.body.email;
    // console.log(req.body);
    // const token = req.body.token
    console.log('index email: ')
    console.log(email)
    const getUserIdQuery = `SELECT id FROM users WHERE email = ?`;

    db.query(getUserIdQuery, [email], (err, results) => {
        if (err) {
            throw err
        }
        if (!results || results.length === 0) {
            res.locals.loggedIn = false;
            console.log('res.locals.loggedIn: ')
            console.log(res.locals.loggedIn)
        } else {
            res.locals.loggedIn = true;
            res.locals.uid = results[0].id
            console.log('res.locals.uid: ')
            console.log(res.locals.uid)
            console.log('res.locals.loggedIn: ')
            console.log(res.locals.loggedIn)
        }
        next();
    })
})
router.get('/events/:eventId',(req, res)=>{
    const eventId = req.params.eventId;
    const getEventQuery = `
    SELECT events.id AS event_id, events.address AS event_address, events.description AS event_description, 
    events.dine_in AS event_dine_in, events.host_id AS host_id, events.pick_up AS event_pick_up, 
    events.picture AS event_picture, events.portions AS event_portions, events.price AS event_price,
    events.time AS event_time, events.title AS event_title, users.id AS users_id, users.first_name AS users_name,
    users.picture AS users_picture, host_reviews.title AS review_title, host_reviews.review AS review_content, 
    host_reviews.stars AS review_stars, host_reviews.reviewed_id AS reviewed_id
    FROM events, users, host_reviews
    WHERE events.host_id = users.id and users.id = host_reviews.reviewed_id and events.host_id = 1 and events.id = 1;
    `
    db.query(getEventQuery,[eventId],(err, result)=>{
      if(err) throw err;
      res.json(result)
    })
  })

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Get Request');
});

module.exports = router;
