function length_json_array (jsonString){
  obj = JSON.parse(jsonString);
  shareInfoLen = Object.keys(obj.shareInfo[0]).length;
  return shareInfoLen;
}

module.exports = {
  length_json_array: length_json_array
}
