var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var kid_model = require('./Kid').model;
var verify_token = require('../auth/VerifyToken');

router.get('/', verify_token, function(req, res, next) {
  kid_model.find({
    parents_id: req.userId
  }, function(err, kids) {
    if (err) return res.status(500).send("error finding kids");
    res.status(200).send(kids);
  });
});

router.get('/:id', verify_token, function(req, res, next) {
  kid_model.find({
    _id: req.params.id,
    parents_id: req.userId
  }, function(err, kid) {
    if (err) return res.status(500).send("error finding kids");
    res.status(200).send(kid);
  });
});

router.post('/', verify_token, function(req, res, next) {
  kid_model.create({
    name: req.body.name,
    year_birthday: req.body.year_birthday,
    photo_path: "null",
    key_boy: "random",
    parents_id: req.userId,
    school: req.body.school
  }, function(err, kid) {
    if (err) return res.status(500).send("error creating kids");
    res.status(200).send(kid);
  });
});

router.put('/:id', verify_token, function(req, res, next) {
  kid_model.findByIdAndUpdate({
    _id: req.params.id,
    parents_id: req.userId
  }, req.body, {
    new: true
  }, function(err, kid) {
    if (err) return res.status(500).send("error updating kids");
    res.status(200).send(kid);
  });
});

router.delete('/:id', verify_token, function(req, res, next) {
  kid_model.findByIdAndRemove({
    _id: req.params.id,
    parents_id: req.userId
  }, function(err, kid) {
    if (err) return res.status(500).send("error deleting kid");
    res.status(200).send("The kid " + kid.name + "was deleted");
  });
});

module.exports = router;
