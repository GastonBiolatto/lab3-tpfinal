import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';




createApp(App).use(store).use(router).mount('#app')

Vue.prototype.$http = axios;