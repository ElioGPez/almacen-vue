<template>
  <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>Cuenta</b>
      </h1>
    </div>
    <br />
    <div class="card">
      <form id="form" class="card-body" >
        <div class="subtitulo"><h4>Informacion del cliente</h4></div>
        <div class="form-group">
          <br>
        <div align="left" class="info">
          <div class="center row">
              <div class="col-2">
                <label for>Nombre: </label>
              </div>
              <div class="col-10">
                <label for>{{cliente.cliente.nombre}}</label>
              </div>

          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Apellido: </label>
              </div>
              <div class="col-10">
                <label for>{{cliente.cliente.apellido}}</label>
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>DNI: </label>
              </div>
              <div class="col-10">
                <label for>{{cliente.cliente.dni}}</label>
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Saldo: </label>
              </div>
              <div class="col-10">
                <label style="color:green;" for>${{cliente.saldo}}</label>
              </div>
          </div><hr>
        </div>

        <div class="subtitulo"><h4>Nuevo Pago</h4></div>
        <br>
          <div class="center row">
              <div class="col-2">
                <label for>Pago </label>
              </div>
              <div class="col-4">
                <input v-model="pago" type="number" placeholder="$00.0" class="form-control">
              </div>
              <div class="col-3" align="left">
                <button
                  @click.prevent="agregarPago()"
                  style="margin:3px;"
                  align="right"
                  class="btn btn-primary"
                >
                  REGISTRAR
                </button>              
          </div>
              <div class="col-12" align="center" v-if="$v.pago.$dirty">
                <div v-if="!$v.pago.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>

    <div >

      <form class="card-body">
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
                      <th>Fecha</th>
                      <th>Pago</th>
                      <th>Tipo</th>

                    </tr>
                  </thead>
                  <paginate name="cuenta" :list="transacciones" :per="8" tag="tbody">
                    <tr v-for="item in paginated('cuenta')" :key="item.id">
                      <td data-label="fecha">
                        {{item.created_at}}                     
                        </td>
                      <td v-if="item.tipo == 'pago'" data-label="Producto">${{item.pago}}</td>
                      <td v-else data-label="Producto">${{item.monto}}</td>    
                    
                      <td data-label="Producto">
                        <span style="font-size: 15px;" v-if="item.tipo == `pago`" class="badge badge-success badge-pill">Pago</span>
                        <span style="font-size: 15px;" v-else class="badge badge-danger badge-pill">Compra</span>
                      </td>
                      
                    </tr>
                    
                  </paginate>
                </table>
              </div>
            </fieldset>
            <br>

          </div>

                      <paginate-links for="cuenta" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

        </div>
      </form>
    </div>

        </div>
      </form>
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
        <h3>{{mensaje}}</h3>
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
import {
  required,
  //minLength,
  //between,
  //integer,
  //email
} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            empleado_id : '',
            cliente : '',
            pago : '',
            mensaje : '',
            cliente_id : this.$route.params.id,
            paginate: ['cuenta'],
            transacciones : []
        }
    },
    methods: {
    obtenerCliente(){
      //console.log("Cliente id: "+this.cliente_id);
        var url = "/api/cuenta/"+this.cliente_id;
        console.log(url);
        axios.get(url).then(response => {
          console.log(response.data[0]);
          this.cliente = response.data[0];

        this.cliente.transaccion.forEach(function(valor, indice, array) {
          valor.tipo='pago';
        });
        this.cliente.venta.forEach(function(valor, indice, array) {
          valor.tipo='venta';
        });
          this.ordenarLista();
        });
    },
    agregarPago(){
      //    'pago','vuelto','fecha','cuenta_id'];
      let datos = new FormData();
      datos.append('pago',this.pago);
      datos.append('vuelto',0);
      datos.append('cuenta_id',this.cliente.id);
      var url = "api/pago";
        axios
          .post(url, 
            datos
          )
          .then(response => {
            console.log(response.data);
          this.mensaje = "Pago registrado!!";

          var linea = new Object();
          linea.created_at = response.data.created_at;
          //linea.imagen = item.imagen;
          linea.pago = response.data.pago;
          linea.tipo = 'pago';

          this.agregarLinea(linea);
          $('#mensajeModal').modal('show');
          });
    },
    agregarLinea(linea){
          console.log('Pasa');
          this.transacciones.push(linea);
          this.cliente.saldo -= linea.pago;
          this.transacciones.sort((a, b) =>  new Date(a.created_at) - new Date(b.created_at));
          this.pago = ''
          
    },
    ordenarLista(){

        this.transacciones = this.cliente.transaccion.concat(this.cliente.venta);
        this.transacciones.sort((a, b) =>  new Date(b.created_at) - new Date(a.created_at));

    }
    },
    created() {
      this.obtenerCliente();
    },
    validations: {
        pago: {
            required
        },
    }
}
</script>
<style>
  .subtitulo {
    font-weight: bold;
    padding-top: 0.5%;
    background-color: rgb(255, 255, 255);
    color: rgb(70, 26, 66); 
    border-style: solid;
    border-color: rgb(52, 6, 56);
    border-width: 2px;
      border-left-width: 0;
        border-right-width: 0;    
  }
  .info{
    padding-left: 30px;
  }
</style>