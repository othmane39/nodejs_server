var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var school_model = require('./School').model;
var verify_token = require('../auth/VerifyToken');


router.get('/', verify_token, function(req, res, next) {

  school_model.find({}, function(err, schools) {
    if (err) return res.status(500).send("There was a problem finding the schools");
    res.status(200).send(schools);
  });

});

router.get('/:id', verify_token, function(req, res, next) {

  school_model.findById(req.params.id, function(err, school) {
    if (err) return res.status(500).send("There was a problem finding the school.");
    if (!school) return res.status(404).send("No school found.");
    res.status(200).send(school);
  });

});

router.post('/', verify_token, function(req, res, next) {
  if (req.userId != config.admin_id) return res.status(400).send("Operation not permitted");

  school_model.create({
      name: req.body.first_name,
      type: req.body.last_name,
      phone: req.body.email,
      adress: req.body.adress
    },
    function(err, school) {
      if (err) return res.status(500).send("There was a problem registering the user`.");

      res.status(200).send(school);
    })
});

router.delete('/:id', verify_token, function(req, res, next) {

  if (req.userId != config.admin_id) return res.status(400).send("Operation not permitted");

  school_model.findByIdAndRemove(req.params.id, function(err, school) {
    if (err) return res.status(500).send("There was a problem deleting the school.");
    res.status(200).send("School " + school.name + " was deleted.");
  });
});


router.put('/:id', verify_token, function(req, res, next) {

  if (req.userId != config.admin_id) return res.status(400).send("Operation not permitted");

  school_model.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, function(err, school) {
    if (err) return res.status(500).send("There was a problem updating the user.");
    res.status(200).send(school);
  });

});

module.exports = router;
