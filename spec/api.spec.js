var api = require('../lib/api')({}),
	expressMock = require('./helpers/expressMock'),
	sequalizeMock = require('./helpers/sequalizeMock');

describe('index',function() {
	var req,res,stub;
	beforeEach(function() {
		stub = {next:function(){}};
		req = new expressMock.Req();
		res = new expressMock.Res();
		req.model = sequalizeMock;
		spyOn(stub,'next');
	})

	it('should call next',function() {
		api.index(req,res,stub.next);
		expect(stub.next).toHaveBeenCalled();
	});
	it('should run next err with an sql error',function() {
		req.model.findAll = function() {
			return{complete:function(fn) {
				fn('error')
			}}
		};
		api.index(req,res,stub.next);
		expect(stub.next).toHaveBeenCalledWith('error');
	});
	it('should have records in locals',function(done) {
		api.index(req,res,function(){
			expect(res.locals.sometables.length).toBe(2);
			done()
		});
	})
});