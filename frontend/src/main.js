import { createApp } from 'vue';

import Toast from './addons/toast';

import router from './router';

import App from './App.vue';

import './app.scss';

createApp(App).use(router).use(Toast).mount('#app');
