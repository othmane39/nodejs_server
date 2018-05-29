var mongoose = require('mongoose');

var document_schema = new mongoose.Schema({
  type: String,
  name: String,
  state: String,
  path: String
});


module.exports = document_schema;
