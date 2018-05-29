var mongoose = require('mongoose');
var user_schema = require('../User/User');
var school_schema = require('../School/School');

var kid_schema = new mongoose.Schema({
  name: String,
  year_birthday: Number,
  photo_path: String,
  keygen_kid: String,
  parent: [ user_schema ],
  school: school_schema
});



module.exports = kid_schema;
