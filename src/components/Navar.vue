<template>
  <div>
    <nav id="sidebar2" class="navbar navbar-expand-sm navbar-light">
      <!-- Logo -->
      <h3 style="color:white;">ALMACEN</h3>
      <button
        :class="[navbar]"
        type="button"
        data-toggle="collapse"
        data-target="#ca-navbar"
        aria-controls="ca-navbar"
        :aria-expanded="expanded"
        aria-label="Toggle navigation"
      >
        <span id="toggler" class="navbar-toggler-icon"></span>
      </button>
      <!-- Menu Area -->
      <div class="navbar-collapse collapse" id="ca-navbar" style>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Ventas
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/venta_nueva">
                  <i class="fas fa-plus-circle"><b> Venta</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/venta">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Compras
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/compra_nueva">
                  <i class="fas fa-plus-circle"><b> Compra</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/compra">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Productos
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/producto_nuevo">
                  <i class="fas fa-plus-circle"><b> Producto</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/producto">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Categorias
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/categoria_nueva">
                  <i class="fas fa-plus-circle"><b> Categoria</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/categoria">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Clientes
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/cliente_nuevo">
                  <i class="fas fa-plus-circle"><b> Cliente</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/cliente">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Proveedores
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/proveedor_nuevo">
                  <i class="fas fa-plus-circle"><b> Proveedor</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/proveedor">
                  <i class="fas fa-list-ol"><b> Listado</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a
              id="navbarDropdownMenuLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Información
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a id="ab"  class="nav-link">
                <router-link  to="/informe">
                  <i class="fas fa-plus-circle"><b> Informe</b></i>
                </router-link>
              </a>
              <a id="ab" class="nav-link">
                <router-link  to="/estadisticas">
                  <i class="fas fa-list-ol"><b> Estadisticas</b></i>
                </router-link>
              </a>
            </div>
          </li>
          <li style="padding-left:15px;" v-if="isLoggedIn" class="nav-item">
            <a class="nav-link user">
              <i class="fas fa-user"></i>
              {{valor}}
            </a>
          </li>
          <li style="padding-left:15px;" class="nav-item">
                <router-link v-if="isLoggedIn" to="/login">
                  <button @click="logout" class="btn btn-info">Cerrar Sesion</button>
                </router-link>
          </li>
          
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "nav_mio",
  data() {
    return {
      expanded: "false",
      navbar: "navbar-toggler collapsed show"
    };
  },
  computed : {
      //Retirna True o False dependiendo de si existe o no el Token en el state->token
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      valor(){
        return  JSON.parse(localStorage.getItem('usuario')).name;
      }
    },

  methods: {
    normal() {
      this.navbar = "navbar-toggler collapsed";
      this.expanded = "false";
    },
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
  }
};
</script>

<style>
.user {
  border-style: solid;
  border-color: white;
  border-width: 1px;
}

#sidebar2 {
  background: #4e1044;
  color: #000000;
  transition: all 0.3s;
  font-weight: bold;
}
#sidebar2 ul li a {
  font-size: 10pt;
  display: block;
  padding-right: 10px;
  color: rgb(255, 255, 255);
}
#ab.nav-link a{
  color: black;
}
#sidebar2 ul li a a:hover {
  background-color: rgb(109, 12, 122);
  color: rgb(255, 255, 255);
}

@media screen and (max-width: 760px) {
  #sidebar2 ul li a a {
    padding: 10px;
    font-size: 1em;
    display: block;
    border-block-end: 2px solid white;
  }
}
</style>