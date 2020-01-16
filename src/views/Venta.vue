<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>VENTAS</b>
      </h1>
    </div>
    <br />
    <!-- FILTROS -->
    <div class="card">
      <div class="row">
        <div style="margin-left:5px;" class="col-2 row">
          <select
            id="inputState"
            class="form-control"
            v-model="filtro"
            @change="filtroAplicado($event)"
          >
            <option selected value="0">FILTRAR...</option>
            <option value="1">Ventas de Hoy</option>
            <option value="2">Entre Fechas</option>
            <option value="3">Todas las ventas</option>
          </select>
        </div>
        <div class="col-4 row">
          <div class="col-6 center">
            <p class="text-right">
              <b>DESDE</b>
            </p>
          </div>
          <div class="col-6">
            <input :disabled="!(filtro == 2)" class="form-control" type="date" v-model="fecha_desde" />
          </div>
        </div>
        <div class="col-4 row">
          <div class="col-6 center" align="right">
            <p class="text-right">
              <b>HASTA</b>
            </p>
          </div>
          <div class="col-6">
            <input :disabled="!(filtro == 2)" class="form-control" type="date" v-model="fecha_hasta" />
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
    <br />
    <div id="cardlist" class="card">

      <form class="card-body">
        <div v-if="carga==0" class="loader" id="loader">Loading...</div>
        
        <div v-else class="form-group">
                <div align="left">
        <router-link style="color:white;" to="/venta_nueva">
          <button style="margin:3px;" class="btn btn-info">
            <i class="fas fa-plus-circle"></i> VENTA
          </button>
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
                  <paginate name="venta" :list="listado_ventas" :per="4" tag="tbody">
                    <tr v-for="item in paginated('venta')" :key="item.id">
                      <td data-label="Votos">{{item.id}}</td>
                      <td data-label="fecha">{{item.created_at}}</td>
                      <td data-label="Producto">${{item.monto}}</td>
                      <td data-label="Producto">
                        <a href>
                          <router-link
                            :to="{
                            name : 'venta_detalle',
                            params : {id : item.id}
                          }"
                          >
                            <button @click.prevent="detalle(item)" class="btn-icon btn btn-warning">
                              <i class="fas fa-info-circle"></i>
                            </button>
                          </router-link>
                        </a>
                      </td>
                    </tr>
                  </paginate>
                </table>
              </div>
            </fieldset>
            <br />
          </div>

          <paginate-links
            for="venta"
            :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"
          ></paginate-links>
        </div>
      </form>
    </div>
    <!--button @click="obtenerId()">Cualquiera</button>
    <p>{{id_usuario}}</p-->
    <br />

    <!-- Modal -->
    <div
      id="modal_pendiente"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" style="background-color: #3a0041;" class="modal-header">
            <h3 style="color:white;">Detalle de la Venta: {{lineas[0].id}}</h3>
          </div>
          <div class="modal-body">
            <hr />
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
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Monto</th>
                        <th>SubTotal</th>
                      </tr>
                    </thead>
                    <paginate name="linea_venta" :list="lineas" :per="4" tag="tbody">
                      <tr v-for="item in paginated('linea_venta')" :key="item.id">
                        <td data-label="Producto">{{item.producto.nombre}}</td>
                        <td data-label="Producto">{{item.cantidad}}</td>
                        <td data-label="Producto">${{item.producto.precio_venta}}</td>
                        <td data-label="Producto">${{item.subtotal}}</td>
                      </tr>
                    </paginate>
                  </table>
                </div>
              </fieldset>
              <paginate-links
                for="linea_venta"
                :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"
              ></paginate-links>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

        <!-- Modal -->
<div class="modal fade" id="mensajeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">MENSAJE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {{mensaje}}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">ACEPTAR</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      filtro: 0,
      listado_ventas: [],
      listado_ventas_aux: [],
      paginate: ["venta", "linea_venta"],
      fecha_desde: "",
      fecha_hasta: "",
      id_usuario: "",
      id_venta: '',
      lineas: [{ id: "0", producto: { nombre: "" } }],
      mensaje : '',
      carga:0
    };
  },
  methods: {
    getResults() {
      axios.get("api/venta").then(response => {
        this.listado_ventas = response.data;
        this.listado_ventas_aux = this.listado_ventas;
        this.carga = 1;
        console.log(this.listado_ventas);
      });
    },
    obtenerId() {
      this.id_usuario = this.$store.state.usuario;
    },
    detalle(item) {
      this.id_venta = item.id;
      this.lineas = item.linea_venta;

      $("#modal_pendiente").modal("show");
    },
    obtenerVentasFechas(){
        this.listado_ventas = this.listado_ventas_aux;

        var desde = new Date(this.fecha_desde);
        var hasta = new Date(this.fecha_hasta);
        var m1 = desde.getDate() + 1;
        var m2 = hasta.getDate() + 1;

        desde.setDate(m1);
        hasta.setDate(m2);
        desde.setHours(0);
        hasta.setHours(0);
        
      if(this.fecha_desde=='' || this.fecha_hasta==''){
            $('#mensajeModal').modal('show');
            this.mensaje = 'Los campos DESDE y HASTA no deben estar vacios!';
      }else
      if(desde>hasta){
            $('#mensajeModal').modal('show');
            this.mensaje = 'El campo DESDE no puede ser mayor que el campo HASTA';
      }else{
        var listadoResultante = [];

        this.listado_ventas.forEach(function(valor, indice, array) {
        console.log('Fecha 1: '+ desde);
        console.log('Fecha a Comparada: '+ new Date(valor.created_at));
        console.log('Fecha 2: '+ hasta);
          if (
            desde < new Date(valor.created_at) &&
            hasta > new Date(valor.created_at)
          ) {
                    console.log('PASAAA');

            listadoResultante.push(valor);
          }
        });
            if(listadoResultante.length != 0){
              this.listado_ventas = listadoResultante;
            }
            else{
                var nulo = new Object();
                nulo.id = '';
                nulo.created_at = "No se encontraron ventas";
                var nulos = [nulo];
                this.listado_ventas = nulos;
              }      }

    },
    filtroAplicado(event) {
      if (event.target.value == "1") {
        this.listado_ventas = this.listado_ventas_aux;
        
        var n = new Date();
        //Año
        var y = n.getFullYear();
        //Mes
        var m = n.getMonth() + 1;
        //Día
        var d = n.getDate();
        var d2 = n.getDate() + 1;

        var hoy1 = new Date(y + "/" + m + "/" + d);
        var hoy2 = new Date(y + "/" + m + "/" + d2);

        var listadoResultante = [];
        this.listado_ventas.forEach(function(valor, indice, array) {
          /*console.log('Fecha 1: '+ hoy1);
        console.log('Fecha a Comparada: '+ new Date(valor.created_at));
        console.log('Fecha 2: '+ hoy2);*/
          if (
            hoy1 < new Date(valor.created_at) &&
            hoy2 > new Date(valor.created_at)
          ) {
            listadoResultante.push(valor);
          }
        });
        //console.log(listadoResultante);
            if(listadoResultante.length != 0){
              this.listado_ventas = listadoResultante;
            }
            else{
                var nulo = new Object();
                nulo.id = '';
                nulo.created_at = "No se encontraron ventas";
                var nulos = [nulo];
                this.listado_ventas = nulos;
              }
        //this.listado_ventas = listadoResultante;
      } else if (event.target.value == "3") {
        this.listado_ventas = this.listado_ventas_aux;
      }
    }
  },
  mounted() {
    this.getResults();
  }
};
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
.btn {
  background-color: #5a0064;
  color: aliceblue;
}
table thead {
  background-color: #3a0041;
  color: rgb(245, 250, 255);
  font-size: 12pt;
}

.table td {
  text-align: center;
  font-weight: bold;
  font-size: 12pt;
}
</style>