import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Venta from './views/Venta.vue'
import VentaNueva from './views/VentaNueva.vue'
import Compra from './views/Compra.vue'
import CompraNueva from './views/CompraNueva.vue'
import Producto from './views/Producto.vue'
import ProductoNuevo from './views/ProductoNuevo.vue'
import Cliente from './views/Cliente.vue'
import Categoria from './views/Categoria.vue'
import CategoriaNueva from './views/CategoriaNueva.vue'
import ClienteNuevo from './views/ClienteNuevo.vue'
import Cuenta from './views/Cuenta.vue'
import Estadistica from './views/Estadisticas.vue'
import Proveedor from './views/Proveedor.vue'
import ProveedorNuevo from './views/ProveedorNuevo.vue'
import Informe from './views/Informe.vue'

import store from './store.js'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/venta',
      name: 'venta',
      component: Venta,
     /* meta: { 
        requiresAuth: true
      }*/
    },
    {
      path: '/compra',
      name: 'compra',
      component: Compra,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/cliente',
      name: 'cliente',
      component: Cliente,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/cliente_nuevo',
      name: 'cliente_nuevo',
      component: ClienteNuevo,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: Categoria,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/categoria_nueva',
      name: 'categoria_nueva',
      component: CategoriaNueva,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/producto',
      name: 'producto',
      component: Producto,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/proveedor',
      name: 'proveedor',
      component: Proveedor,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/proveedor_nuevo',
      name: 'proveedor_nuevo',
      component: ProveedorNuevo,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/producto_nuevo',
      name: 'producto_nuevo',
      component: ProductoNuevo,
      meta: { 
        requiresAuth: true
      }
    },
    {
    path: '/compra_nueva',
    name: 'compra_nueva',
    component: CompraNueva,
    meta: { 
      requiresAuth: true
    }
    },
    {
      path: '/venta_nueva',
      name: 'venta_nueva',
      component: VentaNueva,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/informe',
      name: 'informe',
      component: Informe,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path : '/cuenta/:id',
      name : 'cuenta',
      component: Cuenta,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path : '/estadisticas',
      name : 'estadisticas',
      component: Estadistica,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})
export default router