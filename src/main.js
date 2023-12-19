
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios from 'axios'
import store from './store/index.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import BootstrapVue3 from 'bootstrap-vue-3'

const instance = axios.create({
    baseURL: "http://192.168.0.10:5173/",
    timeout: 1000,
});

const app = createApp(App)
app.use(router)
app.use(store)
app.use(BootstrapVue3)
app.provide('$axios', axios)
app.config.globalProperties.$axios = axios;
app.mount('#app')
