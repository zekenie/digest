module.exports = {
  inflection: require ('inflection'),
  cap: function(str){
    return str.substr(0,1).toUpperCase() + str.substr(1);
  },
  lower: function(str) {
    return str.substr(0,1).toLowerCase() + str.substr(1);
  }
}