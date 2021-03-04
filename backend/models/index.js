import Sequelize from 'sequelize';

import config from '../config';

const { MYSQL_DBHOST, MYSQL_DBUSER, MYSQL_DBPWD, MYSQL_DBPORT, DBNAME, DB_LOGS } = config.db;

import user from './user';
import ma_table from './ma_table';
import envelope from './envelope';

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
const Envelope = sequelize.define('envelope', envelope, {
	tableName: 'envelope',
	timestamps: false
});

Envelope.belongsTo(User, {
	foreignKey: 'id_user_traite',
	targetKey: 'id',
	as: 'UserTraite'
});
Envelope.belongsTo(User, {
	foreignKey: 'id_user_recupere',
	targetKey: 'id',
	as: 'UserRecupere'
});

User.hasMany(Envelope, {
	foreignKey: 'id_user_traite',
	sourceKey: 'id',
	as: 'EnveloppeTraitees'
});
User.hasMany(Envelope, {
	foreignKey: 'id_user_recupere',
	sourceKey: 'id',
	as: 'EnveloppeRecuperees'
});

User.sync();
Envelope.sync();

export default {
	User,
	MaTable,
	Envelope
};
