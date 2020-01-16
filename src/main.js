import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
Vue.component('pagination', require('laravel-vue-pagination'));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Axios.defaults.baseURL = 'http://127.0.0.1:8000/';
Axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')

Axios.interceptors.response.use(undefined, function (err) {
  return new Promise(function (resolve, reject) {
    console.log(err);
    if ((err.status === 401 && err.config && !err.config.__isRetryRequest)
    ||err == 'Error: Request failed with status code 400'
      ||err == 'Error: Request failed with status code 401') {
      console.log('pasa')
      store.dispatch('logout')
    }
    throw err;
  });
});

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer '+token
  Vue.prototype.$http.defaults.headers.post['Content-Type'] = 'application/json';

}