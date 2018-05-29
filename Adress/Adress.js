var mongoose = require('mongoose');

var adress_schema = new mongoose.Schema({
  numero: Number,
  name: String,
  postal_code: {
    type: Number,
    min: 10000,
    max: 99999
  },
  city: String,
  country: String,
  longitude: String,
  latitude: String,
  principal: Boolean
});


module.exports = adress_schema;
