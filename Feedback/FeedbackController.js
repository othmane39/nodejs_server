var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var feedback_model = require('./Feedback').model;
var user_model = require('../User/User').model;
var pickup_model = require('../Pickup/Pickup').model;
var verify_token = require('../auth/VerifyToken');

//get my feedbacks
router.get('/', verify_token, function(req, res) {
  user_model.findById(req.userId, {
    _id: 0,
    feedbacks: 1
  }, function(err, feedbacks) {
    if (err) return res.status(500).send("Error in finding feedbacks");
    if (!feedbacks) return res.status(400).send("User dont fount");
    res.status(200).send(feedbacks.feedbacks);
  });
});

//get feedbacks of id
router.get('/:id', verify_token, function(req, res) {
  user_model.findById(req.params.id, {
    _id: 0,
    feedbacks: 1
  }, function(err, feedbacks) {
    if (err) return res.status(500).send("Error in finding feedbacks");
    if (!feedbacks) return res.status(400).send("User dont fount");
    res.status(200).send(feedbacks.feedbacks);
  });
});

router.post('/:id', verify_token, function(req, res) {
  pickup_model.find({
    _id: req.params.id,
    reservations: {
      user_picked: {
        _id: req.userId
      },
      state: 'done',
      feedback_state: 'waiting'
    }
  }, function(err, pickup) {
    if (err) return res.status(500).send("Error in finding pickup");
    if (!pickup) return res.status(400).send("cant send feedback");
    feedback_model.create({
      note: req.body.note,
      comment: req.body.comment,
      user_poster_id: req.userId,
      picked: 'yes'
    }, function(err, feedback) {
      if (err) return res.status(500).send("Error in sending feedback");
      user_model.findByIdAndUpdate(pickup.picker_id, {
        $push: {
          feedbacks: feedback
        }
      }, {
        new: true
      }, function(err, user) {
        if (err) return res.status(500).send("Error in finding user");
        if (!user) return res.status(400).send("user unfound");
        res.status(200).send(user);
      });
    });
  });
});

module.exports = router;
