import DbConnection from '../helpers/db_connection';
import models from '../models';
import { salt, saltVerify } from '../helpers/security';
import config from '../config';
import Sequelize from 'sequelize';

const { db, loggers } = config;

const dbconnection = () =>
	DbConnection({
		MYSQL_DBHOST: db.MYSQL_DBHOST,
		MYSQL_DBUSER: db.MYSQL_DBUSER,
		MYSQL_DBPWD: db.MYSQL_DBPWD,
		MYSQL_DBPORT: db.MYSQL_DBPORT,
		databaseName: db.DBNAME
	});

const create_MATABLE = async () => {
	loggers.trace('Création de la table ma_table');

	const sql = `
		CREATE TABLE IF NOT EXISTS ma_table (
		ID MEDIUMINT NOT NULL AUTO_INCREMENT,
		VALUE TEXT NOT NULL,
		PRIMARY KEY (ID)
		)
	`;
	try {
		await dbconnection().executeQuery(sql);
	} catch (_) {
		loggers.trace(_);
	}
};

const add_Column_DateCreation_MATABLE = async () => {
	loggers.trace('Ajout de la colonne DATE_CREATION dans la table ma_table');

	const sql = 'ALTER TABLE ma_table ADD COLUMN DATE_CREATION DATETIME NULL DEFAULT NULL';
	try {
		await dbconnection().executeQuery(sql);
	} catch (e) {
		//loggers.error(e); // On supprime le log ici, car l'erreur survient à chaque fois (sauf la première fois)
	}
};

const insertOrUpdate_MATABLE = async () => {
	loggers.trace('Insert ou Update de la table ma_table');
	try {
		const sql = `
                insert into ma_table (Id, Value, DATE_CREATION)
                values (1, "Texte", now())
                ON DUPLICATE KEY UPDATE
                Value = "Texte update", DATE_CREATION = now()
            `;
		await dbconnection().executeQuery(sql);
	} catch (_) {
		loggers.error(_);
	}
};

const addUsersDemo = async () => {
	//await models.User.create({ email: 'user@demo.com', firstname: 'John', lastname: 'DOE' });
	let user = await models.User.findOrCreate({
		where: { email: 'john@doe.com' },
		defaults: { id: 1, email: 'john@doe.com', firstname: 'John', lastname: 'DOE', password: salt('abcd') }
	});

	user = await models.User.findOrCreate({
		where: { email: 'marge@simpson.com' },
		defaults: { id: 2, email: 'marge@simpson.com', firstname: 'Marge', lastname: 'SIMPSON', password: salt('abcd') }
	});

	let envelope = await models.Envelope.findOrCreate({
		where: { id_envelope: 1 },
		defaults: { recuperee: true, id_user_recupere: 1, id_user_traite: 2, date: Sequelize.fn('NOW') }
	});

	envelope = await models.Envelope.findOrCreate({
		where: { id_envelope: 2 },
		defaults: { recuperee: true, id_user_recupere: 1, id_user_traite: 1, date: Sequelize.fn('NOW') }
	});

	const testEnveloppe = await models.Envelope.findOne({
		where: { id_envelope: 1 },
		include: [ 'UserTraite', 'UserRecupere' ]
	});

	const testUser = await models.User.findOne({
		where: { id: 1 },
		include: [ 'EnveloppesTraitees', 'EnveloppesRecuperees' ]
	});

	const testUser2 = await models.User.findOne({
		where: { id: 2 },
		include: [ 'EnveloppesTraitees', 'EnveloppesRecuperees' ]
	});
	loggers.trace(JSON.stringify(testEnveloppe));

	// loggers.trace(JSON.stringify(testUser));
	// loggers.trace(JSON.stringify(testUser));
};

export default {
	update: async () => {
		loggers.trace('Mise à jour de la base de données si necessaire...');

		await create_MATABLE();
		await add_Column_DateCreation_MATABLE();
		await insertOrUpdate_MATABLE();

		await addUsersDemo();

		loggers.trace('Fin de la mise à jour de la base.');
	}
};
