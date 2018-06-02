var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var message_model = require('../Message/Message').model;
var conversation_model = require('../Conversation/Conversation').model;
var verify_token = require('../auth/VerifyToken');

//send message/start conversation to id

router.post('/:id', verify_token, function(req, res, next) {
  conversation_model.find({
    $or: [{
      user1: req.params.id,
      user2: req.userId
    }, {
      user1: req.userId,
      user2: req.params.id
    }]
  }, function(err, conversation) {
    if (err) return res.status(500).send("There was a problem sending the message");

    message_model.create({
      sender: req.userId,
      receiver: req.params.id,
      content: req.body.content,
      date: new Date(),
      status: 'unread'
    }, function(err, message) {
      if (err) return res.status(500).send("There was a problem sending the message");

      if (!conversation) {
        conversation_model.create({
          user1: req.userId,
          user2: req.params.Id,
          contents: [message],
          state_user1: 'display',
          state_user2: 'display'
        }, function(err, conv) {
          if (err) return res.status(500).send("There was a problem sending the message");
          res.status(200).send(conv);
        });
      } else {
        conversation_model.findByIdAndUpdate(conversation._id, {
          $push: {
            contents: message
          }
        }, {
          new: true
        }, function(err, conv) {
          if (err) return res.status(500).send("There was a problem updating the conversation.");
          res.status(200).send(conv);
        });
      }
    });
  });
});

router.get('/', verify_token, function(req, res, next) {
  conversation_model.find({
    $or: [{
      user1: req.userId
    }, {
      user2: req.userId
    }]
  }, function(err, conversation) {
    if (err) return res.status(500).send("There was problem getting your conversations");
    res.status(200).send(conversation);
  });
});

router.get('/:id', verify_token, function(req, res, next) {

  conversation_model.findById(req.params.id, function(err, conversation) {
    if (err) return res.status(500).send("There was problem getting your conversation");
    if (!conversation) return res.status(400).send("No conversation found");
    if (!((conversation.user1 == req.userId) || (conversation.user2 == req.userId)))
      return res.status(400).send("Not your conversation");
    res.status(200).send(conversation);
  });

});

module.exports = router;
