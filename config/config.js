module.exports = {
	development:{
		mongo:'mongodb://localhost',
		db:{
			host:'localhost',
			db:process.env.USER,
			user:process.env.USER,
			port:5432,
			password:''
		}
	}
}