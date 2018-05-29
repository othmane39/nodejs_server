var mongoose = require('mongoose');
var user_schema = require('../User/User');

var message_schema = new mongoose.Schema({
  sender: user_schema,
  receiver: user_schema,
  content: String,
  date: Date,
  state: String
});

module.exports = message_schema;
