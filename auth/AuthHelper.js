var jwt = require('jsonwebtoken');
var errors = require('../Utils/ErrorResponses');

function verify_token_f(res, token, err, decoded) {
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send(errors.auth_failed);
  })
}


module.exports = {
  verify_token: verify_token_f
};
