var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var knife = require('../Utils/SwissKnife');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var reservation_model = require('./Reservation').model;
var pickup_model = require('../Pickup/Pickup').model;
var user_model = require('../User/User').model;
var verify_token = require('../auth/VerifyToken');



//Reserve pickup id
router.get('/:id', verify_token, function(req, res) {

  pickup_model.findById(req.params.id, function(err, pickup) {
    if (err) return res.status(500).send("There was a problem finding the pickup.");
    if (!pickup) return res.status(404).send("No pickup found.");

    if (pickup.reservations.length >= pickup.nb_place) return res.status(400).send("No more places");

    user.model.findById(req.userId, function(err, user) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");

      var addr = user.adress._id;
      if (req.params.adress_id) adrr = req.params.adress_id;
      adress.model.findById(addr, function(err, adress) {
        if (err) return res.status(500).send("There was a problem finding the adress.");
        if (!adress) return res.status(404).send("No adress found.");

        reservation_model.create({
          adress_picked: adress,
          user_picked_id: user._id,
          detour_km: 0,
          created_at: new Date(),
          state: "waiting",
          feedback_state: "not_yet"
        }, function(err, reservation) {
          if (err) return res.status(500).send("There was a problem finding the reservation.");
          if (!adress) return res.status(404).send("No reservation found.");

          pickup_model.findByIdAndUpdate(pickup.id, {
            $push: {
              reservations: reservation
            }
          }, {
            new: true
          }, function(err, pickup) {
            if (err) return res.status(500).send("There was a problem updating the pickup.");
            res.status(200).send(pickup);
          })
        })
      })
    })
  })
});

//cancel reservation pickup id
router.delete('/:id', verify_token, function(req, res) {

  pickup_model.findOne(req.params.id, function(err, pickup) {
    if (err) return res.status(500).send("There was a problem finding the pickup.");
    if (!pickup) return res.status(404).send("No pickup found.");

    for (var i = 0; i < pickup.reservations.length; i++) {
      if (pickup.reservations[i].user_picked_id == req.userId) {
        pickup.reservations[i].remove(function(err) {
          if (err) return res.status(500).send("There was a problem while removing the reservation.");

          //send push notification to picker
          res.status(200).send("Reservation canceled");
        });
      }
    }
  });
});

module.exports = router;
