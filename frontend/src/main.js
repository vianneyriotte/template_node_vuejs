import { createApp } from 'vue';

import Toast from './addons/toast';

import router from './router';

import App from './App.vue';

import '@popperjs/core/dist/esm/popper.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './app.scss';

createApp(App).use(router).use(Toast).mount('#app');
