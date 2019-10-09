var express = require('express');
var router = express.Router();

const db = require('../db');

/* POST events listing. */
router.post('/login', function (req, res) {
    console.log('reached /users/login')
    console.log(req.body)
    const { token, first, last, email, picture } = req.body;
    if (res.locals.loggedIn) {
        res.json({
            msg: 'loggedIn',
            user_id: res.locals.uid,
            first,
            last,
            email,
            picture,
            token
        })
    } else if (!res.locals.loggedIn) {
        const insertUserQuery = `
        INSERT INTO users 
            (first_name, last_name, email, picture)
        VALUES (?, ?, ?, ?)
        `
        const gimmeReviewQuery = `
        INSERT INTO host_reviews
            (reviewed_id, stars, title, review)
        VALUES (?, ?, ?, ?)
        `

        db.query(insertUserQuery, [first, last, email, picture], (err2, results, fields) => {
            if (err2) {
                throw err2
            }
            console.log(results)
            let reviewQueryArray =[
                results.insertId,
                5,
                `Thank You!`,
                `As a gift for joing Homecooked, we start our users off with a 5 star review. We know they will live up to it!`
            ]
            db.query(gimmeReviewQuery, reviewQueryArray, (err3) => {
                if (err3) {
                    throw err3
                }
            })
            res.json({
                msg: 'userAdded',
                user_id: results.insertId,
                first,
                last,
                email,
                picture,
                token
            })
        })
    }
})


/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
