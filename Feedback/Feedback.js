var mongoose = require('mongoose');
var user_schema = require('../User/User')._schema;

var feedback_schema = new mongoose.Schema({
  note: { type:Number, min:0, max: 5},
  comment: String,
  user_poster: user_schema._id,
  picked: Boolean
});


mongoose.model('Feedback', feedback_schema);

module.exports = {_schema: feedback_schema, model: mongoose.model('Feedback')};
