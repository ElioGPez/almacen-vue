<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/login">Login</router-link> |
      <router-link to="/venta">Venta</router-link> |
      <router-link to="/venta_nueva">Nueva Venta</router-link> |
      <router-link to="/compra">Compra</router-link> |
      <router-link to="/compra_nueva">Nueva Compra</router-link> |
      <router-link to="/categoria">Categoria</router-link> |
      <router-link to="/producto">Producto</router-link> |
      <router-link to="/producto_nuevo">Nuevo Producto</router-link> |
      <router-link to="/cliente">Cliente</router-link> |
      <router-link to="/cliente_nuevo">Nuevo Cliente</router-link> |
      <router-link to="/cuenta">Cuenta</router-link> |
      <router-link to="/estadisticas">Estadisticas</router-link> |

      <router-link to="/about">About</router-link><span v-if="isLoggedIn"> | <a @click="logout">Logout - {{valor}}</a></span>

    </div>
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
axios.defaults.baseURL = 'http://192.168.1.47:8001/';

export default {
  data() {
    return {
      user : this.$store.token,
    }
  },    
  computed : {
      //Retirna True o False dependiendo de si existe o no el Token en el state->token
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      valor(){
        return  JSON.parse(localStorage.getItem('usuario')).name;
      }
    },
    
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
      created: function () {
        //Sirve para interceptar todos los mensajes de error, para impedir el acceso en caso de que no sea autorizado
    this.$http.interceptors.response.use(undefined, function (err) {
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
