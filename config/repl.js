var repl = require('repl');


module.exports = function(app,db) {
	var r = repl.start({
		prompt: '> ',
		input: process.stdin,
		output: process.stdout
	});
	r.on('exit', process.exit);
	r.context.app = app;
	r.context.db = db;
};