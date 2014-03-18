var Req = function() {};
var Res = function() {};

Res.prototype.json = function(obj) {};
Res.prototype.send = function(status) {};

var RequestRunner = function(fnArray,load) {
	this.route = route;
	this.req = new Req();
	this.res = new Res();
	if(this.load) {
		this.route.splice(0,0,load)
	}
	this.i = 0;
	this.next();
}

RequestRunner.prototype.next = function() {
	if(i < this.route.length)
		this.route[i](this.req,this.res,this.next);
	this.i++;
}

module.exports = {
	Req:Req,
	Res:Res,
	RequestRunner:RequestRunner
};