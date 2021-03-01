import { store } from '../store';

const USER_LOCAL_STORAGE_KEY = '_USER_LOCAL_STORAGE_KEY';
const TOKEN_LOCAL_STORAGE_KEY = '_TOKEN_LOCAL_STORAGE_KEY';

const setUser = async (user) => {
	await localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
	store.setUser(user);
};
const getUser = async () => {
	const user = await localStorage.getItem(USER_LOCAL_STORAGE_KEY);
	return user ? JSON.parse(user) : null;
};
const setToken = async (token) => {
	await localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
};
const getToken = async () => {
	return await localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
};
const resetUserAndToken = async () => {
	await localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
	await localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
	store.setUser(null);
};
const isConnected = async () => {
	return await getUser(); //&& (await getToken());
};

export default {
	setUser,
	getUser,
	setToken,
	getToken,
	resetUserAndToken,
	isConnected
};
