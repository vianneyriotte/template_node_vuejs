import { reactive } from 'vue';

export const store = {
	state: reactive({
		user: null,
		token: null
	}),
	setUser(user) {
		this.state.user = user;
	},
	setToken(token) {
		this.state.token = token;
	}
};
