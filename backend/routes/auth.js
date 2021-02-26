import express from 'express';
import security from '../helpers/security';

const router = express.Router();

router.post('/auth/login', async function(req, res) {
	const token = security.sign({ id: 1, email: 'vianney.riotte@gmail.com' });
	res.send({ token });
});

export default router;
