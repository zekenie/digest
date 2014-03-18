var inflection = require('inflection');

var ControllerName = function(name) {
	this.name = name;
	this.lower = this.name.substr(0,1).toLowerCase() + this.name.substr(1);
	this.plural = inflection.pluralize(this.lower);
	return this.name;
};

ControllerName.prototype.toString = function() {
	return this.name;
};

ControllerName.prototype.valueOf = function() {
	return this.name;
};

var Controller = function Controller(db,table) {
	this.db = db;
	this.table = table;
	this.name = new ControllerName(this.constructor.name);
	this.delete = [this.deleteAction()]
};

Controller.prototype.load = function(req,res,next,id) {
	var self = this;
	this.table.find(id).complete(function(err,rec) {
		if(err) return next(err);
		if(!rec) return res.send(404);
		req[self.name.lower] = rec;
		next();
	});
};

Controller.prototype.jsonRes = function(req,res) {
	res.json(req[this.name.lower]);
};

Controller.prototype.deleteAction = function() {
	var self = this;
	return function(req,res,next) {
		console.log(req)
		req[self.name.lower].destroy().complete(function(err) {
			if(err) return next(err);
			res.send(200);
		})
	};
};

Controller.prototype.create = [
	function(req,res,next) {
		self = this;
		this.table.build(req.body).save().complete(function(err,rec) {
			if(err) return next(err);
			req[self.name.lower] = rec;
			next();
		});
	},
	this.jsonRes
];

Controller.prototype.update = [
	function(req,res,next) {
		var self = this;
		var rec = req[this.name.lower];
		for(key in req.body) {
			rec[key] = req.body[key];
		}
		rec.save().complete(function(err,rec) {
			if(err) return next(err);
			req[self.name.lower] = rec;
			next();
		});
	},
	this.jsonRes
];

Controller.prototype.index = [
	function(req,res,next) {
		var self = this;
		this.table.findAll().complete(function(err,records) {
			if(err) return next(err);
			req[self.name.plural] = records;
		});
	},
	function(req,res,next) {
		res.json(req[this.name.plural]);
	}
];

Controller.prototype.view = [
	this.jsonRes
];

module.exports = Controller;