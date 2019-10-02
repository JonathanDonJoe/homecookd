var express = require('express');
var router = express.Router();

const db = require('../db');

router.post('/signup', function (req, res) {
    console.log('req.body: ')
    console.log(req.body)
    const { first, last, email, picture, token } = req.body;
    if ((!first) || (!last) || (!email) || (!token)) {
        res.json({
            msg: 'invalidData'
        })
        return;
    }
    console.log( 'hi')
    const checkUserQuery = `SELECT * FROM users WHERE email = ?`
    db.query(checkUserQuery, [email], (err, results) => {
        if (err) {
            throw err
        }
        if (results.length > 0) {
            res.json({
                msg: 'userExists'
            })
        } else {
            const insertUserQuery = `
                INSERT INTO users 
                    (first_name, last_name, email, picture, token)
                VALUES (?, ?, ?, ?, ?)
                `
            db.query(insertUserQuery, [first, last, email, picture, token], (err2) => {
                if (err2) {
                    throw err2
                }
                res.json({
                    msg: 'userAdded',
                    token,
                    email,
                    first
                })
            })
        }
    })
});


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
