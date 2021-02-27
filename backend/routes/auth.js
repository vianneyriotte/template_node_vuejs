import express from 'express';
import security from '../helpers/security';
import config from '../config';

const { loggers } = config;

const router = express.Router();

router.post('/login', async function(req, res) {
	const { email, password } = req.body;

	loggers.trace(`Tentative de connexion de l'utilisateur '${email}'`);

	// TODO : procédure d'authentification ...

	const token = security.sign({ id: 1, email, name: 'User' });

	res.send({ token });
});

export default router;
