<template>
  <div id="app">
    <Navar></Navar>
    <router-view/>

  </div>
</template>

<script>
import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)
import VueGoogleCharts from 'vue-google-charts'
Vue.use(VueGoogleCharts)
import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token')
import Navar from "@/components/Navar.vue";

export default {
  data() {
    return {
     // user : this.$store.token,
    }
  },   
  components: {
    Navar
  }, 
    
    methods: {
    },
      created: function () {
        //Sirve para interceptar todos los mensajes de error, para impedir el acceso en caso de que no sea autorizado
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });
  } 
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');


#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    background-color: rgb(255, 255, 255);

}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.router{
  color: white;
  font-weight: bold;
}
.error {
  border: 1px solid red;
}

/* Para la animacion de carga */
.loader,
.loader:before,
.loader:after {
  background: #5a0064;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
}
.loader {
  text-indent: -9999em;
  margin: 5% auto;
  position: relative;
  font-size: 11px;
  -webkit-animation-delay: 0.16s;
  animation-delay: 0.16s;
}
.loader:after {
  left: 1.5em;
  -webkit-animation-delay: 0.32s;
  animation-delay: 0.32s;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0 #FFF;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em #ffffff;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0 #5a0064;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em #5a0064;
    height: 5em;
  }
}
</style>
