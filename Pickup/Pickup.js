var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress');
var user_schema = require('../User/User');
var school_schema = require('../School/School');
var reservation_schema = require('../Reservation/Reservation');

var pickup_schema = new mongoose.Schema({
  date: Date,
  nb_place: Number,
  aller: Boolean,
  auth_code: String,
  picker: user_schema,
  school: school_schema,
  start_adress: adress_schema,
  reservations: [ reservation_schema ]
});

module.exports = pickup_schema;
