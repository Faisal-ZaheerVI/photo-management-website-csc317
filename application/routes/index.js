var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware');
var db = require("../config/database");

/* GET home page. */
router.get("/", getRecentPosts, function(req, res, next) {
  res.render("index", { title: "Zaheer Photo App"});
});

/* GET Login Page */
router.get("/login", (req,res,next) => {
  res.render("login", {title: "Log In"});
});

/* GET Registration Page */
router.get("/registration", (req,res,next) => {
  res.render("registration", {title: "Register"});
});

router.use("/postimage", isLoggedIn);
/* GET Post an Image Page */
router.get("/postimage", (req,res,next) => {
  res.render("postimage", {title: "Post an Image"});
});

/* GET Image Post Page (../post/id) */
router.get("/post/:id(\\d+)", getPostById, getCommentsByPostId, (req,res,next) => {
  res.render("imagepost", {title: `Post ${req.params.id}`});
});

module.exports = router;
