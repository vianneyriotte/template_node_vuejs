import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcryptjs';

const { jwtsecret } = config;

export const verify = (req, res) => {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		res.status('401').send('Access denied');
		return false;
	}

	try {
		const decoded = jwt.verify(token, jwtsecret);
		req._USER = decoded;
		return true;
	} catch (ex) {
		res.status('400').send('Invalid token');
		return false;
	}
};

export const sign = (data) => {
	const jwtoken = jwt.sign(data, jwtsecret);
	return jwtoken;
};

export const salt = (str) => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(str, salt);
	return hash;
};

export const saltVerify = (str, salted) => {
	return bcrypt.compareSync(str, salted);
};

export default {
	verify,
	sign,
	salt,
	saltVerify
};
