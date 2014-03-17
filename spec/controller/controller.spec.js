var promiseFactory = function(err,n) {
	var records = null;
	if(n === 1)
		records = recordFactory();
	if(n > 1)
		records = [
			recordFactory(1),
			recordFactory(2)
		];
	return {
		complete:function(fn) {
			fn(err,records);
		}
	}
}

var recordFactory = function(id) {
	id = id || 1;
	return {
		id:id,
		save:function() {
			return promiseFactory(null,1)
		},
		destroy:function() {
			return promiseFactory(null,0);
		}
	};
};

var table = {
	find:function(id) {
		if(id === 'err')
			return promiseFactory('err');
		else if(id > 0)
			return promiseFactory(null,1);
		else
			return promiseFactory(null,0);
	},
	findAll:function(query) {
		return promiseFactory(null,2)
	},
	build:function(obj) {
		return recordFactory();
	}
};

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

var Controller = require('../../lib/Controller'),
	controller = new Controller({},table);

//spies

describe('names',function() {
	it('should be called Controller',function() {
		expect(controller.name.toString()).toBe("Controller");
	});
	it('should have a lower case property on name',function() {
		expect(controller.name.lower).toBe('controller');
	});
	it('should have a plural of controllers',function() {
		expect(controller.name.plural).toBe('controllers');
	});
});

describe('load',function() {
	var req,res;

	beforeEach(function() {
		req = new Req();
		res = new Res();
		spyOn(res,'send')
	});

	it('should send 404 for not found',function() {
		controller.load(req,res,function(){},0);
		expect(res.send).toHaveBeenCalledWith(404);
	});

	it('should call next with an error',function() {
		cb = {next:function(){}}
		spyOn(cb,'next');
		controller.load(req,res,cb.next,'err');
		expect(cb.next).toHaveBeenCalledWith('err');
	});

	it('should add `controller` to the req',function(next) {
		controller.load(req,res,function() {
			expect(req.controller).not.toBeUndefined();
			next();
		},1)
	})
});

// describe('')