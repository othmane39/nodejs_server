var mongoose = require('mongoose');
var adress_schema = require('../Adress/Adress');
var feedback_schema = require('../Feedback/Feedback');
var document_schema = require('../Document/Document');

var user_schema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  phone: {
    type: String,
    match: /^[0-9\+]+$/
  },
  adress: [adress_schema],
  birthday: Date,
  networks: {
    fb_tok: String,
    lnkdn_tok: String,
    twit_tok: String
  },
  photo_path: String,
  economy: {
    carburant: Number,
    co2: Number
  },
  feedbacks: [feedback_schema],
  documents: [document_schema]
});
mongoose.model('User', user_schema);

module.exports = mongoose.model('User');
