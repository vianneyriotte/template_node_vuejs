const db_connection = ({ MYSQL_DBHOST, MYSQL_DBUSER, MYSQL_DBPWD, MYSQL_DBPORT, databaseName }) => {
	const newConn = (databaseName) =>
		require('serverless-mysql')({
			config: {
				host: MYSQL_DBHOST,
				user: MYSQL_DBUSER,
				password: MYSQL_DBPWD,
				port: MYSQL_DBPORT,
				database: databaseName
			}
		});

	return {
		// executeQuery: async (sql, values) => {
		// 	return new Promise((resolve, reject) => {
		// 		db = newConn(databaseName);
		// 		try {
		// 			db.connect();
		// 			if (values) {
		// 				db.query(sql, values, (err, rows) => {
		// 					if (err) return reject(err);
		// 					resolve(rows);
		// 				});
		// 			} else {
		// 				db.query(sql, (err, rows) => {
		// 					if (err) return reject(err);
		// 					resolve(rows);
		// 				});
		// 			}
		// 		} catch (_) {
		// 			reject(_);
		// 		} finally {
		// 			try {
		// 				db.end();
		// 			} catch (_) {}
		// 		}
		// 	});
		// },
		executeQuery: async (sql, values) => {
			const db = newConn(databaseName);
			try {
				await db.connect();
				if (values) {
					const rows = await db.query(sql, values);
					return rows;
				} else {
					const rows = await db.query(sql);
					return rows;
				}
			} catch (_) {
				throw _;
			} finally {
				try {
					db.end();
				} catch (_) {}
			}
		},
		/*
        // ****************************************
        // Exemple d'utilisation des transactions
        // **************************************** 
        let requests = [];
        // Une simple requête
		requests.push({
			sql: 'INSERT INTO table ( ca,cb,cd,ce,cf,cg) values (?,?,?,?,?,?,?,?)',
			values: [ a, b, c, d, e, f, g ]
		});
        // En ré-utilisant un id généré (insertId)
        requests.push((r, results) => [
            'INSERT INTO publicite_itineraire_points (ID_ITINERAIRE, LAT_LON, ID_VILLE, POSITION, DATE_AJJ, ID_PERSO_AJJ) values (?,?,?,?,now(),?)',
            [ results[0].insertId, x, y, z ] // <=== ICI, on récupère l'id de la première requete !
        ]);
        try {
			await this.dbconnection.executeTransaction(requests);
		} catch (_) {
			console.log(_);
		}
        */
		executeTransaction: async (requests) => {
			const db = newConn(databaseName);
			var queries = db.transaction();
			try {
				for (let index in requests) {
					const { sql, values } = requests[index];
					queries = queries.query(!sql ? requests[index] : (r, results) => [ sql, values ]);
				}

				await queries
					.rollback((e) => {
						console.log('executeTransaction', e);
					})
					.commit();
			} catch (err) {
				throw err;
			} finally {
				try {
					db.end();
				} catch (__) {}
			}
		}
	};
};

export default db_connection;
