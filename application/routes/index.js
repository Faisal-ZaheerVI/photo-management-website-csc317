var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
var getRecentPosts = require('../middleware/postsmiddleware').getRecentPosts;
var db = require("../config/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: "Zaheer Photo App"});
});

/* GET Login Page */
router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
});

/* GET Registration Page */
router.get('/registration', (req,res,next) => {
  res.render('registration', {title: "Register"});
});

router.use('/postimage', isLoggedIn);
/* GET Post an Image Page */
router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title: "Post an Image"});
});

/* GET Image Post Page */
router.get('/post/:id(\\d+)', (req,res,next) => {
  let baseSQL = 'SELECT u.username, p.title, p.description, p.photopath, p.created FROM csc317db.users u JOIN csc317db.posts p ON u.id=fk_userid WHERE p.id=?;';
  let postId = req.params.id;
  // serverside validation
  
  db.execute(baseSQL, [postId])
  .then(([results, fields]) => {
    if(results && results.length) {
      let post = results[0];
      res.render('imagepost', {currentPost: post})
    } else {
      req.flash('error', 'This is not the post you are looking for!');
      res.redirect('/');
    }
  })
});

module.exports = router;
