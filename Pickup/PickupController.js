var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

var pickup_model = require('./Pickup').model;
var verify_token = require('../auth/VerifyToken');


router.get('/', verify_token, function(req, res){
  
});
