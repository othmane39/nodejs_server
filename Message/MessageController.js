var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var message_model = require('./Message').model;
var verify_token = require('../auth/VerifyToken');
