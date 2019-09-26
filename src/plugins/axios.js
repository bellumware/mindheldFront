import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// const baseURL = 'http://192.168.0.16:8085';
const baseURL = 'http://5.189.175.156:8085/mindheld/';
axios.defaults.baseURL = baseURL;
Vue.use(VueAxios, axios);
