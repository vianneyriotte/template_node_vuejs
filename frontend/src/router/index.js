import { createWebHistory, createRouter } from 'vue-router';
import storage from '../helpers/storage';

import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		name: 'Home',
		component: Home,
		beforeEnter: async (to, from, next) => {
			if (await storage.isConnected()) {
				next();
			} else {
				console.log(await storage.getUser());
				next('/login');
			}
		}
	},
	{
		path: '/:catchAll(.*)',
		component: NotFound
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
