var str = require('../lib/str');

describe('str package',function() {
	it('should capitalize',function(){
		expect(str.cap('fooBar')).toBe('FooBar');
	});
	it('should go lower',function() {
		expect(str.lower('FooBar')).toBe('fooBar');
	})
});