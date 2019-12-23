<template>
    <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>NUEVO CLIENTE</b>
      </h1>
    </div>
    <br>
    <!-- CUERPO -->
    <div class="card">
      <form id="form" class="card-body" @submit.prevent="handleSubmit">
        <div class="form-group">
          <!-- Datos -->


          <div class="center row">
              <div class="col-2">
                <label for>Nombre</label>
              </div>
              <div class="col-10">
                <input v-model="nombre" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.nombre.$dirty">
                <div v-if="!$v.nombre.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr> 
          <div class="center row">
              <div class="col-2">
                <label for>Apellido</label>
              </div>
              <div class="col-10">
                <input v-model="apellido" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.apellido.$dirty">
                <div v-if="!$v.apellido.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>DNI</label>
              </div>
              <div class="col-10">
                <input v-model="dni" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.dni.$dirty">
                <div v-if="!$v.dni.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Telefono</label>
              </div>
              <div class="col-10">
                <input v-model="telefono" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.telefono.$dirty">
                <div v-if="!$v.telefono.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Email</label>
              </div>
              <div class="col-10">
                <input v-model="email" type="text" class="form-control">
              </div>
              <!--div class="col-12" align="center" v-if="$v.email.$dirty">
                <div v-if="!$v.email.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div-->
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Provincia</label>
              </div>
              <div class="col-10">
                <select
                  class="custom-select"
                  v-model="provincia_id"
                  style="text-align-last:center;"
                  @change="rellenarLocalidades($event)"
                >
                  <option value="0" selected>Seleccione la Provincia...</option>
                  <option v-for="item of listado_provincias" :key="item.id" :value="item.id">{{item.nombre}}</option>
                </select>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Localidad</label>
              </div>
              <div class="col-10">
                <select
                  class="custom-select"
                  v-model="localidad_id"
                  style="text-align-last:center;"
                >
                  <option value="0" selected>Seleccione la Localidad...</option>
                  <option v-for="item of listado_localidades" :key="item.id" :value="item.id">{{item.nombre}}</option>
                </select>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Domicilio</label>
              </div>
              <div class="col-10">
                <input v-model="domicilio" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.domicilio.$dirty">
                <div v-if="!$v.domicilio.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div>
          <!-- Fin Datos -->
          <br>
          <div id="btn">
            <button 
             type="submit" class="btn btn-lg btn-block">GUARDAR</button>
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
            nombre : '',
            apellido : '',
            dni : '',
            telefono : '',
            direccion : '',
            email : '',
            localidad_id : '0',
            provincia_id : '0',

            listado_localidades : [],
            listado_provincias : [],
            domicilio : ''
        }
    },
    methods: {
        registrarCliente(){

      let datos = new FormData();
      datos.append('nombre',this.nombre);
      datos.append('apellido',this.apellido);
      datos.append('dni',this.dni);
      datos.append('telefono',this.telefono);
      datos.append('email',this.email);
      datos.append('domicilio',this.domicilio);
      datos.append('localidad_id',this.localidad_id);


      var url = "api/cliente";
        axios
          .post(url, 
            datos
          )
          .then(response => {
            console.log(response);

          });
    },
    rellenarLocalidades(event){
            console.log(event.target.value);
            console.log(this.listado_provincias);

      if (event.target.value != 0) {
        var listado = [];
        this.listado_provincias.forEach( function(valor, indice, array) {
          if(event.target.value-1 == indice){
        console.log("En el índice " + indice + " hay este valor: " + valor.nombre);
            listado = valor.localidad;
          }
        });
            this.listado_localidades = listado;

      }
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.registrarCliente();
    },
    obtenerLocalidades(event) {
			      axios.get('api/cliente/localidades')
				.then(response => {

          this.listado_provincias = response.data;
          console.log(this.listado_provincias);
				});
    },
    },
    mounted() {
      this.obtenerLocalidades();
    },
    validations: {
        nombre: {
            required
        },
        apellido: {
            required
        },
        dni: {
            required
        },
        telefono: {
            required
        },/*,
        email: {
            required
        },*/
        domicilio: {
            required
        },
    }       
        
}
</script>