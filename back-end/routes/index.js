var express = require('express');
var router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const request = require('request');

var getOptions = { method: 'GET',
  url: 'https://dev-ag0cp9dk.auth0.com/api/v2/',
  headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5qSTBSREU1UVRjME1rTkZRalZHUVVKQ01VTTFRMFZETUVGRU1EVkNNVVU1TVRVeVFUYzJNZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1hZzBjcDlkay5hdXRoMC5jb20vIiwic3ViIjoicXlKcTFNaHRYYlFORHhlTFh1MXd0Tks0aFdES0l1VmVAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LWFnMGNwOWRrLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTcwMTE0MjY2LCJleHAiOjE1NzAyMDA2NjYsImF6cCI6InF5SnExTWh0WGJRTkR4ZUxYdTF3dE5LNGhXREtJdVZlIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.C-TzawdVIg9BLBAP2LeeWSr-_05o2Mqhamy9XJ7jmvogOfKxHBJNdfhaG4lLB13cXlra6aouWMBOcg-I7iiMbIC133s0U5iRpo_txmQH3zjJozcJf_oWX0Ehk_dr64a6qQtaTicBcdn_edBlDoRkzs6GbdLKcayvkpigNCPcE7BCc3V3SnnOce_okQAbiuY0Ba6fnr0jaVn41MYCpTp69gdMSvWUb1o1dfDrAGUiHecNlTQBNiENd3SeP2-R869F6RHTXB4oYhmCD-S4AUj42EVZbFi4YF9z5iZ4IRfTtWLGaNpBfNEu4OMKgtqIlYGpulrkfaxJlN2Hiy3Zoux-Ew' } };

request(getOptions, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

var postOptions = { method: 'POST',
  url: 'https://dev-ag0cp9dk.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"qyJq1MhtXbQNDxeLXu1wtNK4hWDKIuVe","client_secret":"IfDdIqcjgqjq6dnEZbS9esIq857Vh5BvUq3Uy8KM_XFP3tpN6HE3DvrBZf3hEwcN","audience":"https://dev-ag0cp9dk.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(postOptions, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

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
    const { token, first_name, last_name, email, picture } = req.body;
    console.log(req.body);
    // const token = req.body.token
    console.log('index token: ')
    console.log(token)
    const getUserIdQuery = `SELECT id FROM users WHERE token = ?`;

    db.query(getUserIdQuery, [token], (err, results) => {
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
