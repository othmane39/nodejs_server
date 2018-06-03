var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var adress_model = require('./Adress').model;
var user_model = require('../User/User').model;
var verify_token = require('../auth/VerifyToken');

router.get('/', verify_token, function(req, res, next) {
  user_model.findById({
    _id: req.userId
  }, function(err, user) {
    if (err) return res.status(500).send("error finding user");

    res.status(200).send(user.adress);
  });
});

router.post('/', verify_token, function(req, res, next) {
  adress_model.create(req.body, function(err, adress) {
    if (err) return res.status(500).send("error creating adress");
    user_model.findByIdAndUpdate(req.userId, {
      $push: {
        adress: adress
      }
    }, {
      new: true
    }, function(err, user) {
      if (err) res.status(500).send("error updating user");
      res.status(200).send(user);
    });
  });
});

router.put('/:id', verify_token, function(req, res, next) {

  user_model.find({
    _id: req.userId,
    adress: {
      _id: req.params.id
    }
  }, function(err, user) {
    if (err) return res.status(500).send("error finding adress");
    user_model.updateOne({_id: req.userId,
      adress: req.body
    }, function (err, user){
      if (err) return res.status(500).send("error finding adress");
      res.status(200).send(user.adress);
    });
  });
});

router.delete('/:id', verify_token, function(req, res, next) {
  user_model.find({
    _id: req.userId,
    adress: {
      _id: req.params.id
    }
  }, function(err, user) {
    if (err) return res.status(500).send("error finding adress");
    if (!user) return res.status(500).send("cant find adress");

    adress_model.findByIdAndRemove(req.params.id, function(err, adress) {
      if (err) return res.status(500).send("error deleting adress");
      res.status(200).send("The adress " + adress.tag + "was deleted");
    });
  });
});

module.exports = router;
