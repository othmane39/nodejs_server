var express = require('express');
var app = express();
var db = require('./db');

var AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

var UserController = require('./User/UserController');
app.use('/users', UserController);



module.exports = app;
