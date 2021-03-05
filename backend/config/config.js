module.exports = {
	development: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	},
	test: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	},
	production: {
		username: process.env.MYSQL_DBUSER,
		password: process.env.MYSQL_DBPWD,
		database: process.env.DBNAME,
		host: process.env.MYSQL_DBHOST,
		port: process.env.MYSQL_DBPORT,
		dialect: 'mysql'
	}
};
