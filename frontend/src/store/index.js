import { reactive } from 'vue';

export const store = {
	state: reactive({
		user: null
	}),
	setUser(user) {
		this.state.user = user;
	}
};
