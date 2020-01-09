<template>
    <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>NUEVO PROVEEDOR</b>
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
                <input v-model="razon_social" type="text" class="form-control" 
                :class="{ error: $v.razon_social.$error }">
              </div>
              <div class="col-12" align="center" v-if="$v.razon_social.$dirty">
                <div v-if="!$v.razon_social.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr> 
          <div class="center row">
              <div class="col-2">
                <label for>CUIT</label>
              </div>
              <div class="col-10">
                <input v-model="cuit" type="text" class="form-control">
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Email</label>
              </div>
              <div class="col-10">
                <input v-model="email" type="text" class="form-control">
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Telefono</label>
              </div>
              <div class="col-10">
                <input v-model="telefono" type="text" class="form-control">
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
            razon_social : '',
            cuit : '',
            email : '',
            telefono : '',
            mensaje : ''
        }
    },
    methods: {
    registrar(){
      let datos = new FormData();
      datos.append('razon_social',this.razon_social);
      datos.append('cuit',this.cuit);
      datos.append('email',this.email);
      datos.append('telefono',this.telefono);

        var url = "api/proveedor";
        axios
          .post(url, 
            datos
          )
          .then(response => {
            console.log(response);
          this.limpiar();
          });
    },
    limpiar(){
      this.descripcion = '';
      this.categoria = '';
      this.mensaje = 'Proveedor creado!!';
     // $('#mensajeModal').modal('show');
      this.$router.push('/proveedor')
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.registrar();
    }
    },
    validations: {
        razon_social: {
            required
        },
    }       
        
}
</script>
<style>
    .center label{
        font-weight: bold;
    }
    #form div input {
        text-align: center;
    }

</style>