import http from './http';

const getAll = async () => {
	try {
		const result = await http.doGet({
			url: 'enveloppes/all'
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
	getAll
};
