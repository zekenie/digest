var Controller = require('../lib/Controller');

var UserController = function() {
	Controller.apply(this,arguments);
};


module.exports = function(db) {
	return new UserController(db,db.User);
};