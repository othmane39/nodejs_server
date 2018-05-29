var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress')

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


module.exports = school_schema;
