import jwt from 'jsonwebtoken';
import config from '../config';

const { JWTSECRET } = config;

export const verify = (req, res) => {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		res.status('401').send('Access denied. No token provided');
		return false;
	}

	try {
		const decoded = jwt.verify(token, JWTSECRET);
		req._USER = decoded;
	} catch (ex) {
		res.status('400').send('Invalid token');
		return false;
	}
};

export const sign = (data) => {
	const jwtoken = jwt.sign(data, JWTSECRET);
	return jwtoken;
};

export default {
	verify,
	sign
};
