var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');
var verify_email = require('./AuthHelper').verify_email;

router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(bodyParser.json());
var user_model = require('../User/User').model;

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file
var user_json = require('../Utils/ModelsJSON').user_post_json;

router.post('/login', function(req, res) {

  user_model.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    console.log(user);
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({
      auth: false,
      token: null
    });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({
      id: user._id
    }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({
      auth: true,
      token: token
    });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({
    auth: false,
    token: null
  });
});


router.post('/register', verify_email, function(req, res, next) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);


  user_model.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      birthday: req.body.birthday,
    },
    function(err, user) {
      if (err) return res.status(500).send("There was a problem registering the user`.");

      // if user is registered without errors
      // create a token
      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({
        auth: true,
        token: token
      });
    });

});

router.get('/me', VerifyToken, function(req, res, next) {

  user_model.findById(req.userId, {
    password: 0
  }, function(err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});

module.exports = router;
