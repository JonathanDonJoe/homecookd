var express = require("express");
var router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const multer = require('multer');
const config = require('../config')
var stripe = require('stripe')(config.stripe)
const upload = multer( { dest: './public/images/events/' });

const db = require("../db");

router.post('*', upload.single('locationImage'), (req, res, next) => {
    console.log(req.body)
    next();
})

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
});

router.post("*", checkJwt, (req, res, next) => {
  const email = req.body.email;
  // console.log(req.body);
  // const token = req.body.token
  console.log("index email: ");
  console.log(email);
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

router.post('/MessageEvents', (req, res) => {
    console.log(res.locals.uid);
    const getUserMessageEventsQuery = `
        select events.title, events.picture
        from events, attendances
        where events.id = attendances.event_id and attendances.user_id = ? 
    `

    db.query(getUserMessageEventsQuery, [res.locals.uid], (err, result) => {
        if (err) throw err;
        console.log('result')
        console.log(result)
        res.json(result)
    })
})

router.post('/Messages', (req, res) => {
    console.log(res.locals.uid);
    const getUserMessagesQuery = `
        select messages.sender_id, messages.event_id, messages.sent_time, 
        messages.content, events.title, events.picture AS event_picture,
        users.first_name AS sender_name, users.picture AS sender_picture
        from messages, events, users, attendances
        where events.id = attendances.event_id and messages.event_id=events.id
        and users.id = messages.sender_id and attendances.user_id = ?
        order by messages.event_id desc
    `

    db.query(getUserMessagesQuery, [res.locals.uid], (err, result) => {
        if (err) throw err;
        console.log('result')
        console.log(result)
        res.json(result)
    })
})


/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Get Request");
});

router.post('/payment/stripe', (req, res) => {
    console.log(req.body);
    // res.json(req.body)
    if(!res.locals.loggedIn) {
        res.json({
            msg:'badToken'
        })
        return;
    }
    const { stripeToken, amount, email, event_id, num_servings } = req.body;
    stripe.charges.create({
        amount,
        currency: 'usd',
        source: stripeToken,
        description: `Charges for ${email}`
    }, (err, charge) => {
        if (err)  {
            res.json({
                msg: 'errorProcessing'
            });
        } else {
            const insertAttendingQuery = `
                INSERT INTO attendances 
                    (user_id, event_id, paid, dine_in, pick_up)
                VALUES
                    (?, ?, ?, ?, ?)`
            db.query( insertAttendingQuery, [res.locals.uid, event_id, num_servings, 1, 1]);
            res.json({
                msg:'paymentSuccess'
            })
        }
    })
})

module.exports = router;
