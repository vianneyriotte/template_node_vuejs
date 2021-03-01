import { store } from '../store';

const _getOptions = ({ method = 'GET', data = null, secured = true }) => {
	var headers = new Headers({
		'Content-Type': 'application/json'
	});
	if (secured) {
		const token = store.state.token;
		headers = new Headers({
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		});
	}
	var options = {
		method,
		headers: headers
	};
	if (method === 'POST') {
		options = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		};
	}
	return options;
};

const doGet = async ({ url, secured = true }) => {
	const options = _getOptions({ method: 'GET', secured });

	const res = await fetch(import.meta.env.VITE_BACKEND_URL + url, options);
	if (res.status !== 200) {
		throw res.status;
	} else {
		return res.json();
	}
};

const doPost = async ({ url, data, secured = true }) => {
	const options = _getOptions({ method: 'POST', data, secured });

	const res = await fetch(import.meta.env.VITE_BACKEND_URL + url, options);
	if (res.status !== 200) {
		throw res.status;
	} else {
		return res.json();
	}
};

const doPut = async (url, data) => {};

const doDelete = async (url) => {};

export default {
	doGet,
	doPost,
	doPut,
	doDelete
};
