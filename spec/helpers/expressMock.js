var sequelizeMock = require('./sequalizeMock');

var Req = function() {};
var Res = function() {};

Res.prototype.json = function(obj) {};
Res.prototype.send = function(status) {};


var RequestRunner = function(fnArray,load) {
	this.fnArray = fnArray;
	this.req = new Req();
	this.res = new Res();
	this.i = 0;
}

RequestRunner.prototype.load = function(cb) {
	console.log('fake load called')
	this.req.controller = sequelizeMock.find(1).complete(cb);
}

RequestRunner.prototype.next = function() {
	if(this.i < this.fnArray.length)
		this.fnArray[this.i](this.req,this.res,this.next);
	this.i++;
}

module.exports = {
	Req:Req,
	Res:Res,
	RequestRunner:RequestRunner
};