var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress')._schema;
var user_schema = require('../User/User')._schema;
var school_schema = require('../School/School')._schema;
var reservation_schema = require('../Reservation/Reservation')._schema;

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


  mongoose.model('Pickup', pickup_schema);

  module.exports = {_schema: pickup_schema, model: mongoose.model('Pickup')};
