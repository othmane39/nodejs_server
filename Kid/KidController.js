var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var kid_model = require('./Kid').model;
var verify_token = require('../auth/VerifyToken');
