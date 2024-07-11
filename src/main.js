import './assets/css/base.css'
import './assets/css/home.css'
import './assets/css/feature.css'

// import './assets/js/index.js'
// import './assets/js/style.js'
// import './assets/js/function.js'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'



const app = createApp(App);
app.use(router);
app.mount('#app');
// createApp(App).mount('#app')
