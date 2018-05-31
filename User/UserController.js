var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var user_model = require('./User').model;

var verify_token = require('../auth/VerifyToken');



// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', verify_token, function(req, res) {

  var quer = {};
  if (req.userId != config.admin_id) quer = {
    _id: req.userId
  };
  user_model.find(quer, function(err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    res.status(200).send(user);
  });

});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', verify_token, function(req, res) {

  projection = {
    last_name: 0,
    password: 0,
    adress: [],
    email: 0,
    phone: 0,
    birthday: 0,
    networks: 0,
    documents: [],
  };

  user_model.findById(req.params.id, projection, function(err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });

});


// DELETES A USER FROM THE DATABASE
router.delete('/:id', verify_token, function(req, res, next) {

  if (req.userId != config.admin_id) return res.status(400).send("Operation not permitted");

  user_model.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send("There was a problem deleting the user.");
    res.status(200).send("User " + user.name + " was deleted.");
  });

});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', verify_token, function(req, res, next) {

  if (req.userId != req.params.id) return res.status(400).send("Operation not permitted");
  else if (req.userId != config.admin_id) return res.status(400).send("Operation not permitted");

  user_model.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function(err, user) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(user);
  });

});

module.exports = router;
