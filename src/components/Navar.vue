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
          <li class="nav-item">
            <router-link to="/panel">
              <a class="nav-link">Panel</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/informe">
              <a class="nav-link">Informe</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/registro">
              <a class="nav-link">Registro de Votos</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/usuario">
              <a class="nav-link">Usuarios</a>
            </router-link>
          </li>
            
            <router-link to="/usuario">
              <button  class="btn btn-info">Cerrar Sesion</button>
            </router-link>
          
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
      expanded : "false",
      navbar : "navbar-toggler collapsed show"
    }
  },
  methods: {
    normal(){
      this.navbar = "navbar-toggler collapsed"
      this.expanded = "false";
    }
  },
};
</script>

<style>

#sidebar2 {

    background: #4e1044;
    color: #000000;
    transition: all 0.3s;
    font-weight: bold;
}
#sidebar2 ul li a {
    font-size: 1.1em;
    display: block;
    padding-right: 10px;
    color: aliceblue;
}

#sidebar2 ul li a a:hover {
    background-color: rgb(109, 12, 122);

}

@media screen and (max-width: 760px) {
#sidebar2 ul li a a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
        border-block-end: 2px solid white;

}
}
</style>