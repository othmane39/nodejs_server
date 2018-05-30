var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress')._schema

var school_schema = new mongoose.Schema({
  id: Number,
  name: String,
  type: String,
  phone: {
    type: String,
    match: /^[0-9\+]+$/
  },
  adress: adress_schema
});
mongoose.model('School', school_schema);

module.exports = {_schema: school_schema, model: mongoose.model('School')};
