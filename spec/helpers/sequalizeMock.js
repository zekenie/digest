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
	name:'Sometable',
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

module.exports = table;