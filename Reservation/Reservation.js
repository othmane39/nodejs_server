var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress')._schema;
var user_schema = require('../User/User')._schema;

var reservation_schema = new mongoose.Schema({
  adress_picked: adress_schema,
  user_picked: user_schema,
  detour_km: Number,
  created_at: Date,
  state: String
});


mongoose.model('Reservation', reservation_schema);

module.exports = {_schema: reservation_schema, model: mongoose.model('Reservation')};
