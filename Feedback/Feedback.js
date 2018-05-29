var mongoose = require('mongoose');
var user_schema = require('../User/User');

var feedback_schema = new mongoose.Schema({
  note: { type:Number, min:0, max: 5},
  comment: String,
  user_poster: user_schema,
  picked: Boolean
});

module.exports = feedback_schema;
