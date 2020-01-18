<template>
  <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>COMPRAS</b>
      </h1>
    </div>
    <br>
    <!-- FILTROS -->
    <div class="card">
      <div class="row">
        <div style="margin-left:5px;" class="col-2 row">
      <select id="inputState" class="form-control">
        <option selected>FILTRAR...</option>
        <option>Compras de Hoy</option>
        <option>Entre Fechas</option>
        <option>Todas las compras</option>
      </select>
        </div>
        <div class="col-4 row">
          <div class="col-6 center">
            <p class="text-right"><b>DESDE</b></p>
          </div>
          <div class="col-6">
            <input class="form-control" type="date" v-model="fecha_desde" />
          </div>
        </div>
        <div class="col-4 row">
          <div class="col-6 center" align="right">
            <p class="text-right"><b>HASTA</b></p>
          </div>
          <div class="col-6">
            <input class="form-control" type="date" v-model="fecha_hasta" />
          </div>
        </div>
        <div class="col-2" align="center">
          <button
            @click.prevent="obtenerVentasFechas()"
            style="margin:3px;"
            align="right"
            class="btn btn-primary"
          >FILTRAR</button>
        </div>
        
      </div>
    </div>

    <!-- TABLA -->
    <br>
    <div id="cardlist" class="card">

      <form class="card-body">
        <div v-if="carga==0" class="loader" id="loader">Loading...</div>

        <div v-else class="form-group">
      <div  align="left">
        <router-link style="color:white;" to="/compra_nueva">
          <button style="margin:3px;" class="btn btn-info"><i class="fas fa-plus-circle"></i> COMPRA</button>
        </router-link>
      </div>
          <!-- Tabla -->
          <div class="form-group">
            <fieldset>
              <div class>
                <table
                  class="table table-striped table-bordered table-condensed table-hover"
                  style="background-color:white"
                >
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Fecha</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr> 
                  </thead>
                  <paginate name="compra" :list="listado_compras" :per="8" tag="tbody">
                    <tr v-for="compra in paginated('compra')" :key="compra.id">
                      <td data-label="Votos">{{compra.id}}</td>
                      <td data-label="imagen">{{compra.fecha}}</td>
                      <td data-label="Producto">{{compra.monto}}</td>
                      <td>
                        <a>
                      <router-link :to="{
                        name : 'compra_detalle',
                        params : {id : compra.id}
                      }">
                      <button class="btn-icon btn btn-warning">
                        <i class="far fa-edit"></i>
                      </button>        
                      </router-link>
                        </a>
                      </td>
                    </tr>
                  </paginate>
                </table>
              </div>
          <div>
            <hr />
            <h5 align="right">
              TOTAL
              <b style="color:green;">${{total}}</b>
            </h5>
          </div>
            </fieldset>
            <br>

          </div>

            <paginate-links for="compra" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

        </div>
      </form>
    </div>



  </div>
</template>
<script>
import axios from "axios";


export default {
    data() {
        return {
            listado_compras:[],
            paginate: ['compra'],
            fecha_desde : '',
            fecha_hasta : '',
            carga : 0,
            total:0
        }
    },
    methods: {
      getResults() {
			  axios.get('api/compra')
				.then(response => {
          this.carga = 1
          this.listado_compras = response.data;
          console.log(this.listado_compras);

        var aux = 0;
        this.listado_compras.forEach(function(valor, indice, array) {
          aux += valor.monto;
        });
        this.total = aux;

				});
        },
    },
    mounted() {
      this.getResults();
    },
}
</script>
<style>
    .center { 
    display: flex;
    align-items: center;
    }
    .row {
    padding-top: 5px;
        padding-bottom: 5px;
    }
    .card {
      background-color: rgb(231, 231, 231);
    }
    .btn{
    background-color: #5a0064;
    color: aliceblue;
    }
    table thead{
      background-color: #3a0041;
      color: rgb(245, 250, 255);
    }
</style>