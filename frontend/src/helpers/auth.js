import storage from '../helpers/storage';
import http from '../helpers/http';

const connexion = async ({
	email,
	password
}) => {
	try {
		const result = await http.doPost({
			url: 'auth/login',
			data: {
				email,
				password
			},
			secured: false
		});
		if (result.ok && result.data && result.data.token) {
			await storage.setUser({
				email
			});
			await storage.setToken(result.data.token);
			return true;
		} else {
			return false;
		}
	} catch (_) {
		return false;
	}
};

const getUserInfo = async () => {
	try {
		const result = await http.doGet({
			url: 'secured/userinfo'
		});
		if (result.ok && result.data) {
			return result.data;
		} else {
			return false;
		}
	} catch (_) {
		return false;
	}
};

export default {
	connexion,
	getUserInfo
};