function user_create_json(req) {
  return {

    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    //adress: [adress_schema],
    birthday: req.body.birthday,
    //networks: {
    //  fb_tok: String,
    //  lnkdn_tok: String,
    //  twit_tok: String
    //},
    //photo_path: String,
    //economy: {
    //  carburant: Number,
    //  co2: Number
    //},
    //feedbacks: [feedback_schema],
    //documents: [document_schema]
  };
}

module.exports = {
  user_post_json: user_create_json
}
