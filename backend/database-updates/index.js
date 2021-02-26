import DbConnection from '../helpers/db_connection';
import config from '../config';

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
                insert into ma_table (TEXT, DATE_CREATION)
                values (1, Texte", now())
                ON DUPLICATE KEY UPDATE
                TEXT = "Texte update", DATE_CREATION = now() WHERE ID = 1
            `;
		await dbconnection().executeQuery(sql);
	} catch (_) {
		loggers.error(_);
	}
};

export default {
	update: async () => {
		loggers.trace('Mise à jour de la base de données si necessaire...');

		await create_MATABLE();
		await add_Column_DateCreation_MATABLE();
		await insertOrUpdate_MATABLE();

		loggers.trace('Fin de la mise à jour de la base.');
	}
};