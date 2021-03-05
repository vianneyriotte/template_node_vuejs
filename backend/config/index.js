import debug from 'debug';
import { version, name } from '../package.json';
import _ from 'lodash';

const loggers = {
	debug: debug('app:debug'),
	fatal: debug('app:fatal'),
	error: debug('app:erreur'),
	info: debug('app:info'),
	trace: debug('app:trace'),
	db: debug('app:db')
	// DEBUG=app:debug,app:fatal,app:erreur,app:info,app:trace,app:db < dans .env
};

import dbconfig from './config';

const config = {
	port: process.env.SERVER_PORT || 3001,
	db: {
		MYSQL_DBHOST: dbconfig.development.host,
		MYSQL_DBUSER: dbconfig.development.username,
		MYSQL_DBPWD: dbconfig.development.password,
		MYSQL_DBPORT: dbconfig.development.port,
		DBNAME: dbconfig.development.database,
		DB_LOGS: process.env.DB_LOGS
	},
	jwtsecret: process.env.JWTSECRET,
	prod_env: !process.env.PLATFORM, // Par défaut, si rien n'est fourni, c'est l'env. de produciton
	dev_env: process.env.PLATFORM && process.env.PLATFORM == 'dev',
	preprod_env: process.env.PLATFORM && process.env.PLATFORM == 'preprod',
	loggers,
	version,
	name
};

export default config;
