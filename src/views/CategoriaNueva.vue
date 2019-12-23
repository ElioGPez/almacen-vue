<template>
    <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>NUEVA CATEGORIA</b>
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
                <input v-model="categoria" type="text" class="form-control" 
                :class="{ error: $v.categoria.$error }">
              </div>
              <div class="col-12" align="center" v-if="$v.categoria.$dirty">
                <div v-if="!$v.categoria.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr> 
          <div class="center row">
              <div class="col-2">
                <label for>Descripcion</label>
              </div>
              <div class="col-10">
                <input v-model="descripcion" type="text" class="form-control">
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
            categoria : '',
            descripcion : '',
            mensaje : ''
        }
    },
    methods: {
    registrarCategoria(){
          console.log("bla");
      let datos = new FormData();
      datos.append('categoria',this.categoria);

        var url = "api/categoria";
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
      this.mensaje = 'Categoria creada!!';
     // $('#mensajeModal').modal('show');
      this.$router.push('/categoria')
    },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.registrarCategoria();
    }
    },
    validations: {
        categoria: {
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