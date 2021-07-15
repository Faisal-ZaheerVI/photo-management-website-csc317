var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name:"Faisal Zaheer" });
});

/* GET Login Page */
router.get('/login', (req,res,next) => {
  res.render('login');
})

/* GET Registration Page */
router.get('/registration', (req,res,next) => {
  res.render('registration');
})

/* GET Post an Image Page */
router.get('/postimage', (req,res,next) => {
  res.render('postimage');
})

/* GET Image Post Page */
router.get('/imagepost', (req,res,next) => {
  res.render('imagepost');
})

module.exports = router;
