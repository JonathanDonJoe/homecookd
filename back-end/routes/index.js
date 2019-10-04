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


/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('Get Request');
});

module.exports = router;
