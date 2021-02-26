import express from 'express';
import config from '../config';

const router = express.Router();

router.get('/', async function(req, res) {
	res.send(`${config.name.toUpperCase()} v.${config.version}`);
});

export default router;
