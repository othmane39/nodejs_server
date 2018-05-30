var mongoose = require('mongoose');

var document_schema = new mongoose.Schema({
  type: String,
  name: String,
  state: String,
  path: String
});


mongoose.model('Document', document_schema);

module.exports = {_schema: document_schema, model: mongoose.model('Document')};
