import express from 'express';
import authenticated from '../middlewares/auth';
import response from '../helpers/response';

const router = express.Router();

router.get('/userinfo', [ authenticated ], async function(req, res) {
	return response.Http200(res, req._USER);
});

export default router;
