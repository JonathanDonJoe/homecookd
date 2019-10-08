var express = require('express');
var router = express.Router();

const db = require('../db');

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
        db.query(insertUserQuery, [first, last, email, picture], (err2, results, fields) => {
            if (err2) {
                throw err2
            }
            console.log(results)
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
