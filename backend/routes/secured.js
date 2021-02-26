import express from 'express';
import authenticated from '../middlewares/auth';

const router = express.Router();

router.post('/secured/userinfo', [ authenticated ], async function(req, res) {
	console.log(req._USER);

	res.send('TODO user info');
});

export default router;