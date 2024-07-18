import './assets/css/base.css'
import './assets/css/home.css'
import './assets/css/feature.css'

import './assets/js/index.js'

import { createPinia } from 'pinia';
import Toast from 'vue-toastification'

import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { useAccount } from './stores/useAccount';

// const auth = getAuth()
const pinia = createPinia();

const app = createApp(App);
app.use(pinia)
app.use(Toast)
app.use(router);

// const authStore = useAccount();
// app.use(authStore);
app.mount('#app');

