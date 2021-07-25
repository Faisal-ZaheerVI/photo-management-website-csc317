var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Photo App"});
});

/* GET Login Page */
router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
})

/* GET Registration Page */
router.get('/registration', (req,res,next) => {
  res.render('registration', {title: "Register"});
})

/* GET Post an Image Page */
router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title: "Post Image"});
})

/* GET Image Post Page */
router.get('/imagepost', (req,res,next) => {
  res.render('imagepost', {title: "Image Post"});
})

module.exports = router;
