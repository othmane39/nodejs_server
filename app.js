var express = require('express');
var app = express();
var db = require('./db');

var auth_controller = require('./auth/AuthController');
app.use('/auth', auth_controller);

var school_controller = require('./School/SchoolController');
app.use('/school', school_controller);

var reservation_controller = require('./Reservation/ReservationController');
app.use('/reserve', reservation_controller);

var user_controller = require('./User/UserController');
app.use('/user', user_controller);

var conversation_controller = require('./Conversation/ConversationController');
app.use('/conversation', conversation_controller);



module.exports = app;
