import express from 'express';
import authenticated from '../middlewares/auth';
import response from '../helpers/response';
import enveloppeController from '../controllers/enveloppeController';

const router = express.Router();

router.get('/all', [ authenticated ], async function(req, res) {
	try {
		const result = await enveloppeController.getEnveloppes(req, res);
		return response.Http200(res, result);
	} catch (_) {
		return response.Http500(res, _);
	}
});

export default router;
