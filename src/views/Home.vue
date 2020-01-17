<template>
  <div class="menu container">
      <div>
          <h1 class="titulo"><b>SISTEMA DE VENTAS</b></h1>
      </div>
      <br>
    <div class=" row">
      <div class="caja col-xl-3 col-lg-6">
        <div class="card text-white bg-success">
          <div align="center" class="card-header card-primary">
            <div class="row" align="center">
              <div class="col-12">
                <i class="fa fa-cash-register fa-6x"></i>
              </div>
            </div>
          </div>
          <div class="card-footer card-default">
            <h2 style="color:white;">
      <router-link class="router" to="/venta">VENTAS</router-link>
            </h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div class="card text-white bg-warning">
          <div align="center" class="card-header card-primary">
            <div class="row" align="center">
              <div class="col-12">
                <i class="fa fa-shopping-cart fa-6x"></i>
              </div>
            </div>
          </div>
          <div class="card-footer card-default">
            <h2 style="color:white;">
      <router-link class="router" to="/compra">COMPRAS</router-link>
            </h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div class="card text-white bg-primary">
          <div align="center" class="card-header card-primary">
            <div class="row" align="center">
              <div class="col-12">
                <i class="fa fa-users fa-6x"></i>
              </div>
            </div>
          </div>
          <div class="card-footer card-default">
            <h2 style="color:white;">
      <router-link class="router" to="/venta">CLIENTES</router-link>
            </h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div class="card text-white bg-danger">
          <div align="center" class="card-header card-primary">
            <div class="row" align="center">
              <div class="col-12">
                <i class="fa fa-box fa-6x"></i>
              </div>
            </div>
          </div>
          <div class="card-footer card-default">
            <h2 style="color:white;">
      <router-link class="router" to="/producto">PRODUCTOS</router-link>
            </h2>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </div>
          <br>
      <br>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    venta() {
      console.log("Evento lanzado");
    }
  }
};
</script>

<style>
    .menu {
        background-color: #ffffff;
    padding: 20px;
    min-height: 80vh;
    }
    .titulo {
        color: #ffffff;
        background-color: #5a0064;
        padding-top: 10px;
        padding-bottom: 10px;
        font-size: 20pt;
    }
</style>