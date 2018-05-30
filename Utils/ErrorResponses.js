var auth_failed_f = {
  auth: false,
  message: 'Failed to authenticate token.'
}

var no_token_f = {
  auth: false,
  message: 'No token provided.'
}


module.exports = {
  auth_failed: auth_failed_f,
  no_token: no_token_f
}
