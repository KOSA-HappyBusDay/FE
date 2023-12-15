
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const instance = axios.create({
    baseURL: "http://192.168.0.10:5173/",
    timeout: 1000,
});

const app = createApp(App)
app.use(router)
app.use(store)
app.provide('$axios', axios)
app.config.globalProperties.$axios = axios;
app.mount('#app')
