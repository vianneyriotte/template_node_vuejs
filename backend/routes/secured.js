import express from 'express';
import authenticated from '../middlewares/auth';
import response from '../helpers/response';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/userinfo', [ authenticated ], async function(req, res) {
	try {
		const result = await userController.userInfo(req, res);
		return response.Http200(res, result);
	} catch (_) {
		return response.Http500(res, _);
	}
});

export default router;
