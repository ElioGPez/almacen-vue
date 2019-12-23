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
      <form id="form" class="card-body" @submit.prevent="handleSubmit">
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
            style="margin:3px;"
            align="right"
            class="btn btn-primary"
          >REGISTRAR</button>              
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
                      <th>Id</th>
                      <th>Fecha</th>
                      <th>Pago</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                  <paginate name="cuenta" :list="cliente.transaccion" :per="4" tag="tbody">
                    <tr v-for="item in paginated('cuenta')" :key="item.id">
                      <td data-label="Votos">
                        {{item.id}}
                      </td>
                      <td data-label="fecha">
                        {{item.fecha}}                     
                        </td>
                      <td data-label="Producto">${{item.pago}}</td>
                      <td data-label="Producto">
                        <a href>
                          <router-link :to="{
                            name : 'venta_detalle',
                            params : {id : item.id}
                          }">
                            <button class="btn btn-warning">
                              <i class="far fa-edit"></i>
                            </button>        
                          </router-link>
                        </a>
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
            cliente_id : this.$route.params.id,
            paginate: ['cuenta'],
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
        });
    },
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