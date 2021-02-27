import database_updates from './database-updates';
import server from './bootstrap';

(async () => {
	// Mise à jour de la base de données
	await database_updates.update();
	// Démarrage du serveur
	server.start();
})();
