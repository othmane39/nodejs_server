var mongoose = require('mongoose');

var adress_schema = new mongoose.Schema({
  tag: String,
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


mongoose.model('Adress', adress_schema);

module.exports = {_schema: adress_schema, model: mongoose.model('Adress')};
