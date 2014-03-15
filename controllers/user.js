var Controller = function(db,table) {
	this.db = db;
	this.table = table;
};

Controller.prototype.name = function() {
	var name = this.constructor.name;
	name.lower = name.substr(0,1).toLowerCase() + name.substr(1);
	return name;
};

Controller.prototype.load = function(req,res,next,id) {
	var self = this;
	this.table.find(id).complete(function(err,rec) {
		if(err) return next(err);
		if(!rec) return res.send(404);
		req[self.name().lower] = req;
		next();
	});
};

Controller.prototype.delete = [
	function(req,res,next) {
		req[this.name().lower].destroy().complete(function(err) {
			if(err) return next(err);
			res.send(200);
		})
	}
];


module.exports = function(db) {
	return {
		load:function(req,res,next,id) {
			db.User.find(id).complete(function(err,user) {
				if(err) return next(err);
				if(!user) return res.send(404);
				req.user = user;
				next();
			});
		}
	}
};