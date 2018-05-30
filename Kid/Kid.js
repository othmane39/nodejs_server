var mongoose = require('mongoose');
var user_schema = require('../User/User')._schema;
var school_schema = require('../School/School')._schema;

var kid_schema = new mongoose.Schema({
  name: String,
  year_birthday: Number,
  photo_path: String,
  keygen_kid: String,
  parent: [ user_schema ],
  school: school_schema
});

mongoose.model('Kid', kid_schema);

module.exports = {_schema: kid_schema, model: mongoose.model('Kid')};
