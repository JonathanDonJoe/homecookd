var express = require('express');
var router = express.Router();

const db = require('../db');

router.post('*', (req, res, next) => {
    const token = req.body.token
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
