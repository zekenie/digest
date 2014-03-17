

module.exports = function(app,passport,db) {
  require('./controllers/user.js')(db);

};