var mongoose = require('mongoose');
var user_schema = require('../User/User')._schema;
var message_schema = require('../Message/Message')._schema;

var conversation_schema = new mongoose.Schema({
  user1_id: String,
  user2_id: String,
  contents: [message_schema],
  state_user1: 'String',
  state_user2: 'String'
});


mongoose.model('Message', message_schema);

module.exports = {_schema: message_schema, model: mongoose.model('Message')};
