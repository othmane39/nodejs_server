var sort = require('alphanum-sort');
function length_json_array(jsonString) {
  obj = JSON.parse(jsonString);
  shareInfoLen = Object.keys(obj.shareInfo[0]).length;
  return shareInfoLen;
}

function user_sort(user1, user2) {
  var array = [user1, user2];
  var result = sort(array);
  return result;
}

module.exports = {
  length_json_array: length_json_array
}
