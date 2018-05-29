var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress');
var user_schema = require('../User/User');

var reservation_schema = new mongoose.Schema({
  adress_picked: adress_schema,
  user_picked: user_schema,
  detour_km: Number,
  created_at: Date,
  state: String
});


module.exports = reservation_schema;
