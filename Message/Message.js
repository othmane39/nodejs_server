var mongoose = require('mongoose');
var user_schema = require('../User/User')._schema;

var message_schema = new mongoose.Schema({
  sender: user_schema,
  receiver: user_schema,
  content: String,
  date: Date,
  state: String
});


mongoose.model('Message', message_schema);

module.exports = {_schema: message_schema, model: mongoose.model('Message')};
