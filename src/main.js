/* eslint-disable no-console */

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import BootstrapVue3 from 'bootstrap-vue-3'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const instance = axios.create({
    baseURL: "http://localhost:8761/",
    timeout: 1000,
});

const app = createApp(App)
app.use(router)
app.use(store)
app.use(BootstrapVue3)
app.provide('$axios', axios)
app.config.globalProperties.$axios = axios;
app.mount('#app')
