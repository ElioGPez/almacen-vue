import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    usuario : localStorage.getItem('usuario') || '',
    token: localStorage.getItem('token') || '',
    user: {},
    prueba : 'hola',
  },
  mutations: {
    modificar_prueba(state){
      state.prueba = 'modificado';
    },
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, token, usuario){
      state.status = 'success'
      state.token = token
      state.usuario = usuario
      //state.user = user
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login({ commit }, user) {

      return new Promise((resolve, reject) => {
        //nose que hace eso
        commit('auth_request')
        console.log(user)
        //Se hace uso de Axios para mandar la solicitud POST al servidor con los datos del usuarios obtenidos por parametro
        axios({ url: '192.168.1.55:8000/api/authenticate', data: user, method: 'POST' })
          .then(resp => {
                //Del servidor obtenemos el Token, el cual decodificamos para obtener los valores del mismo
                //Mostramos el Token por consola
                console.log('token: '+resp.data.token);
                const usuario = resp.data.user
                const token = resp.data.token
                //localStorage.setItem('usuario', usuario[0])
                localStorage.setItem('usuario', JSON.stringify(usuario[0]));
                //Obtenemos el nombre de usuario del Token obtenido, y lo mostramos por consola
            //Guardamos en el Local Storage el Token obtenido
            localStorage.setItem('token', token)
            //Agregamos al encabezado de laas consultas realizadas por Axios, el Token obtenido
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            /*axios.defaults.baseURL = 'http://localhost:8081';
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.token;
            axios.defaults.headers.post['Content-Type'] = 'application/json';*/
            //Hacemos uso de Commit para llamar a la mutacion 'auth_success' y cambiar el valor de los Estados token y user
            console.log(usuario[0]);


            commit('auth_success', token, usuario[0].name)

            this.state.prueba = 'hola blu';
            //this.state.usuario = resp.data.user;
            //Respondemos con 'resp' obtenido del servidor, si es que todo salio bien
            resolve(resp)//resolve se ejecuta cuando todo sale bien y termina la ejecucion asincrona
          })
          .catch(err => {//En caso de error al realizar la consulta al Servidor
            //nose que es aun
            commit('auth_error')
            //Removemos la informacion del Token, del Local Storage
            localStorage.removeItem('token')
            //Respondemos con el error obtenido
            reject(err)
          })
      })
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:3000/register', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            localStorage.removeItem('usuario')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    //Devuelve TRUE si existe el token
    isLoggedIn: state => !!state.token,
    //Devuelve el estado 
    authStatus: state => state.status,
  }
})
