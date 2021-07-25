const express = require('express');
const router = express.Router();
const db = require('../config/database');

// If we have a URL matching '/getAllUsers', execute the anonymous arrow function
router.get('/getAllUsers', (req, res, next) => {
    db.query('SELECT * from csc317db.users;', (err, results, fields) => {
        if(err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    })
});

router.get('/getAllPosts', (req, res, next) => {
    db.query('SELECT * from csc317db.posts;', (err, results, fields) => {
        if(err) {
            next(err);
        }
        console.log(results);
        res.send(results);
    })
});

// How to do the same thing with Promises
router.get('/getAllPostsP', (req, res, next) => {
    db.query('SELECT * FROM csc317db.posts;')
    .then(([results, fields]) => {
        console.log(results);
        res.send(results);
    })
    .catch((err) => {
        next(err);
    })
});

/*
    --- EXAMPLE HTML TO CONNECT TO BACK END ---
    <form action="dbtest/createUser" method="POST" 
    enctype="x-www-form-urlencoded">
        <input id="username" name="username" />
        <input id="email" name="email" />
        <input id="password" name="password" />
        <input id="button" type="submit" />
    </form>
    - NEED to set the enctype!!!
*/

router.post('/createUser', (req, res, next) => {
    console.log(req.body);
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    // Validate data, if bad, send back response 
    // res.redirecte('/registration') --> sends back to registration page
    // Search "John drop all tables"? to know why validating data is important
    // Someone can run a statement to delete all tables in database if not careful

    let baseSQL = 'INSERT INTO csc317db.users (username, email, password, created) VALUES (?, ?, ?, now())';
    db.query(baseSQL, [username, email, password])
    .then(([results, fields]) => {
        if(results && results.affectedRows) {
            res.send('user was made');
        }
        else {
            res.send('user was not made for some reason');
        }
    })
})

module.exports = router;