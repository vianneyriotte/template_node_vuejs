import express from 'express';
import security from '../helpers/security';
import config from '../config';
import response from '../helpers/response';
import models from '../models';

const { loggers } = config;

const router = express.Router();

router.post('/login', async function(req, res) {
	const { email, password } = req.body;

	loggers.trace(`Tentative de connexion de l'utilisateur '${email}'`);

	const user = await models.User.findOne({
		where: { email: 'john@doe.com' }
	});
	if (user && security.saltVerify(password, user.password)) {
		const token = security.sign({ email: user.email, firstname: user.firstname, lastname: user.lastname });
		return response.Http200(res, { token });
	}
	return response.Http401(res, 'Identifiant ou mot de passe incorrect');
});

export default router;
