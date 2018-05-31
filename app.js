var express = require('express');
var app = express();
var db = require('./db');

var auth_controller = require('./auth/AuthController');
app.use('/auth', auth_controller);

var school_controller = require('./School/SchoolController');
app.use('/school', school_controller);

var user_controller = require('./User/UserController');
app.use('/users', user_controller);



module.exports = app;
