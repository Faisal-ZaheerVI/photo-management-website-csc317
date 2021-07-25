var express = require('express');
var router = express.Router();
const UserError = require('../helpers/error/UserError');
const {successPrint, errorPrint} = require('../helpers/debug/debugprinters');
var db = require('../config/database');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let cpassword = req.body.cpassword;

  /**
   * Do server side validation
   * not done in video, must do on your own
   * Don't rely on just front end validation
   */

  db.execute("SELECT * FROM csc317db.users WHERE username=?", [username])
  .then(([results, fields]) => {
    if(results && results.length == 0) {
      return db.execute("SELECT * FROM csc317db.users WHERE email=?", [email]);
    } else {
      throw new UserError(
        "Registration Failed: Username already exists",
        "/registration",
        200
      );
    }
  })
  .then(([results, fields]) => {
    if(results && results.length == 0) {
      let baseSQL = "INSERT INTO csc317db.users (username, email, password, created) VALUES (?,?,?,now());";
      return db.execute(baseSQL, [username, email, password]);
    } else {
      throw new UserError(
        "Registration Failed: Email already exists",
        "/registration",
        200
      );
    }
  })
  .then(([results, fields]) => {
    if(results && results.affectedRows) {
      successPrint("User.js --> User was created!");
      res.redirect('/login');
    } else {
      throw new UserError(
        "Server Error, user could not be created",
        "/registration",
        500
      );
    }
  })
  .catch((err) => {
    errorPrint("User could not be made", err);
    if(err instanceof UserError) {
      // User error
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect(err.getRedirectURL());
    } else {
      // General Errors
      next(err);
    }
  })
});

router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  console.log(username);
  console.log(password);

  /**
   * Do server side validation
   * not done in video, must do on your own
   * Don't rely on just front end validation
   */

  let baseSQL = "SELECT username, password FROM csc317db.users WHERE username=? AND password=?;";
  db.execute(baseSQL,[username, password])
  .then(([results, fields]) => {
    if (results && results.length == 1) {
      // Valid Credentials
      successPrint(`User ${username} is logged in`);
      res.locals.logged = true;
      res.render('index'); // Doesn't work with res.redirect('/')
    } else {
      // Invalid Credentials
      throw new UserError("Invalid username and/or password", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("user login failed");
    if (err instanceof UserError) {
      errorPrint(err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login');
    } else {
      next(err);
    }
  })
});

module.exports = router;
