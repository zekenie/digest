var sequalizeMock = require('../helpers/sequalizeMock'),
	expressMock = require('../helpers/expressMock'),
	Controller = require('../../lib/Controller'),
	controller = new Controller({},sequalizeMock);

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
		req = new expressMock.Req();
		res = new expressMock.Res();
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
		},1);
	})
});

describe('jsonRes',function() {
	var req,res;
	beforeEach(function() {
		req = new expressMock.Req();
		res = new expressMock.Res();
		spyOn(res,'json');
	});

	it('should call json on res',function() {
		req.controller = 'foo';
		controller.jsonRes(req,res);
		expect(res.json).toHaveBeenCalledWith(req.controller);
	})
});

describe('delete',function() {
	var express;
	beforeEach(function() {
		express = new expressMock.RequestRunner(controller.delete,true);
		spyOn(express.res,'send');
	});
	it('should call res.send with 200 after delete is performed',function() {
		express.next();
		expect(express.res.send).toHaveBeenCalledWith(200);
	});
});