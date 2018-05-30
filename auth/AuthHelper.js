var jwt = require('jsonwebtoken');
var user_model = require('../User/User').model;

function verify_email(req, res, next){
  user_model.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) return req.valid_error = 1;
    if (user) return res.status(400).send("email exist!");
    
    next();
  });
}

module.exports = { verify_email: verify_email}
