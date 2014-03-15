var express = require('express'),
    env = process.env.NODE_ENV || 'development',
    app = express(),
    passport = require('passport'),
    config = require('./config/config')[env],
    db = require('./models')(config)

require('./config/express')(app,config,passport);

if(env === 'development')
	require('./config/repl')(app,db);

app.listen(8080);