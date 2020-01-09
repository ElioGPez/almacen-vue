<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>Informe</b>
      </h1>
    </div>
    <br />
    <!-- FILTROS -->

    <br />
    <div id="cardlist" class="card">
      <br />
      <div class="subtitulo col-12">
        <h4>Ventas</h4>
      </div>
      <br />
      <div class="container">
        <div class="form-group">
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
                      <th>Detalle</th>
                      <th>Fecha</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <paginate name="ventas" :list="ventas" :per="4" tag="tbody">
                    <tr v-for="item in paginated('ventas')" :key="item.id">
                      <td data-label="Producto">
                        <a href>
                          <button @click.prevent="detalle('venta',item)" class="btn btn-warning">
                            <i class="fas fa-info-circle"></i>
                          </button>
                        </a>
                      </td>
                      <td data-label="fecha">{{item.created_at}}</td>
                      <td data-label="Producto">${{item.monto}}</td>
                    </tr>
                  </paginate>
                </table>
              </div>
            </fieldset>
            <!-- Total -->
            <div>
              <hr />
              <h4 align="right">
                TOTAL
                <b style="color:green;">${{total_venta}}</b>
              </h4>
            </div>
          </div>

          <paginate-links
            for="ventas"
            :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"
          ></paginate-links>
        </div>
      </div>

    <hr>
      <div class="subtitulo col-12">
        <h4>Compras</h4>
      </div>
      <br />
      <div class="container">
        <div class="form-group">
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
                      <th>Detalle</th>
                      <th>Fecha</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <paginate name="compras" :list="compras" :per="4" tag="tbody">
                    <tr v-for="item in paginated('compras')" :key="item.id">
                      <td data-label="Producto">
                        <a href>
                          <button @click.prevent="detalle('compra',item)" class="btn btn-warning">
                            <i class="fas fa-info-circle"></i>
                          </button>
                        </a>
                      </td>
                      <td data-label="fecha">{{item.created_at}}</td>

                      <td data-label="Producto">${{item.monto}}</td>
                    </tr>
                  </paginate>
                </table>
              </div>
            </fieldset>
            <!-- Total -->
            <div>
              <hr />
              <h4 align="right">
                TOTAL
                <b style="color:green;">${{total_compra}}</b>
              </h4>
            </div>
          </div>

          <paginate-links
            for="compras"
            :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"
          ></paginate-links>
        </div>
      </div>
      
    <hr>
      <div class="subtitulo col-12">
        <h4>TOTAL NETO</h4>
      </div>
      <br />
      <div class="container">
        <div class="form-group">
          <h2>Total de ganancias NETAS (VENTAS - COMPRAS): ${{total_neto}}</h2>
        </div>
        <br />
      </div>
    
    </div>

 <!-- ACCIONES -->
    <div id="cardlist" class="card">

                  <div class="row">
                <div class="col-6" id="btn">
                  <button
                    type="button"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    class="btn btn-secondary"
                  >GUARDAR INFORME PDF</button>
                </div>
                <div align="right" class="col-6" id="btn">
                  <button type="button" class="btn btn-danger">IMPRIMIR</button>
                </div>
              </div>              </div>

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

  </div>
</template>

<script>
  const axios = require('axios');

export default {
  data() {
    return {
      ventas : [],
      compras : [],
      //gastos : [],
      total_neto : 0,
      total_venta : 0,
      total_compra : 0,
      //total_gasto : 0,
      fecha_desde : '',
      fecha_hasta : '',
      paginate: ["ventas", "compras","linea_venta"],
      tipo : '',
   //   lineas : [],
      lineas: [{ id: "0", producto: { nombre: "" } }],
    }
  },
  methods: {
    obtenerValores(){
      //ventas
var f = new Date();
    var fechaActual =f.getFullYear() + "-0" + (f.getMonth() +1) + "-0" +  f.getDate() ;

    var url = 'api/venta/informe/'+ fechaActual+'/-';
        console.log(url);
			axios.get(url)
				.then(response => {
          console.log(response.data[0])
          this.ventas = response.data[0].ventas;
         // this.mesas =  response.data[0].mesas;
          this.compras = response.data[0].compras;

          for(var venta of this.ventas){
            this.total_venta += venta.monto;
          }
          for(var compra of this.compras){
            this.total_compra += compra.monto;
          }

          /*for(var gasto of this.gastos){
            this.total_gasto += gasto.total;
          }*/

      //console.log('Total Neto: '+this.total_neto+' - Total Venta: '+ this.total_venta + ' - Total Compra: '+this.total_compra +' - Total Gasto: '+this.total_gasto);
              //Sumatoria
      this.total_neto = this.total_venta - this.total_compra;
      console.log('Total Neto: '+this.total_neto);
          });


    },
    obtenerValoresFechas(){
      //ventas

    var url = 'api/venta/informe/'+ this.fecha_desde+'/'+this.fecha_hasta;
//console.log(url);
			axios.get(url)
				.then(response => {

          this.ventas = response.data[0].ventas.data;
          this.compras = response.data[0].compras.data;
          //this.gastos = response.data[0].gastos.data;
                    
         // console.log(response.data[0]);

          for(var venta of this.ventas){
            this.total_venta += venta.total;
          }
          for(var compra of this.compras){
            this.total_compra += compra.total;
          }

         /* for(var gasto of this.gastos){
            this.total_gasto += gasto.total;
          }*/

      //console.log('Total Neto: '+this.total_neto+' - Total Venta: '+ this.total_venta + ' - Total Compra: '+this.total_compra +' - Total Gasto: '+this.total_gasto);
              //Sumatoria
      this.total_neto = this.total_venta - this.total_compra;
      console.log(this.total_neto);
          });


    },
    detalle(tipo,item){
      console.log(tipo);
      this.tipo = tipo;
      
      if(tipo=='venta'){
        this.lineas = item.linea_venta;
      }else{
        this.lineas = item.linea_compra;
      }
      $('#modal_pendiente').modal('show');
    }
  },
  mounted() {
    this.obtenerValores();
  },
}
</script>