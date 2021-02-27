import Sequelize from 'sequelize';

import config from '../config';

const { MYSQL_DBHOST, MYSQL_DBUSER, MYSQL_DBPWD, MYSQL_DBPORT, DBNAME, DB_LOGS } = config.db;

import user from './user';
import ma_table from './ma_table';

const sequelize = new Sequelize(DBNAME, MYSQL_DBUSER, MYSQL_DBPWD, {
	host: MYSQL_DBHOST,
	port: MYSQL_DBPORT,
	logging: DB_LOGS ? true : false,
	dialect: 'mysql',
	freezeTableName: true
});

const User = sequelize.define('users', user, {
	tableName: 'users',
	timestamps: false
});
const MaTable = sequelize.define('ma_table', ma_table, {
	tableName: 'ma_table',
	timestamps: false
});

User.sync();

export default {
	User,
	MaTable
};
