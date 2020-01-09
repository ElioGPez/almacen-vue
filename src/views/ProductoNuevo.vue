<template>
    <div class="menu container">

    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>NUEVO PRODUCTO</b>
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
                <label for>Categoria</label>
              </div>
              <div class="col-10">
                <select
                  class="custom-select"
                  v-model="categoria_id"
                  style="text-align-last:center;"
                >
                  <option value="0" selected>Seleccione la Categoria de Producto...</option>
                  <option v-for="item of listado_categorias" :key="item.id" :value="item.id">{{item.categoria}}</option>
                </select>
              </div>
          </div><hr>
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
                <label for>Descripcion</label>
              </div>
              <div class="col-10">
                <input v-model="descripcion" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.descripcion.$dirty">
                <div v-if="!$v.descripcion.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Stock Minimo</label>
              </div>
              <div class="col-10">
                <input v-model="stock_minimo" type="number" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.stock_minimo.$dirty">
                <div v-if="!$v.stock_minimo.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Precio Venta</label>
              </div>
              <div class="col-10">
                <input v-model="precio_venta" type="number" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.precio_venta.$dirty">
                <div v-if="!$v.precio_venta.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Codigo</label>
              </div>
              <div class="col-10">
                <input v-model="codigo" type="text" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.codigo.$dirty">
                <div v-if="!$v.codigo.required" class="col-6 alert alert-danger" role="alert">
                    <strong>Cuidado!</strong> Este campo es requerido
                </div>
              </div>
          </div><hr>
          <div class="center row">
              <div class="col-2">
                <label for>Fecha de Vencimiento</label>
              </div>
              <div class="col-10">
                <input v-model="fecha_vencimiento" type="date" class="form-control">
              </div>
              <div class="col-12" align="center" v-if="$v.fecha_vencimiento.$dirty">
                <div v-if="!$v.fecha_vencimiento.required" class="col-6 alert alert-danger" role="alert">
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
            descripcion : '',
            categoria : '',
            codigo : '',
            stock_minimo : '',
            precio_venta : '',
            fecha_vencimiento : '',
            categoria_id : '0',
            listado_categorias : []
        }
    },
    methods: {
        registrarProducto(){

      let datos = new FormData();
      datos.append('nombre',this.nombre);
      datos.append('descripcion',this.descripcion);
      datos.append('stock_minimo',this.stock_minimo);
      datos.append('precio_venta',this.precio_venta);
      datos.append('fecha_vencimiento',this.fecha_vencimiento);
      datos.append('categoria_id',this.categoria_id);
      datos.append('tipo','UNIDAD');
      datos.append('codigo',this.codigo);

      var url = "api/producto";
        axios
          .post(url, 
            datos
          )
          .then(response => {
            console.log(response);
            this.limpiar();
          });
        },
    handleSubmit(e) {
      this.submitted = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.registrarProducto();
    },
    obtenerCategorias(event) {
			      axios.get('api/categoria')
				.then(response => {

          this.listado_categorias = response.data;
          console.log(this.listado_categorias);
				});
    },
    limpiar(){
      this.mensaje = 'Producto creado!!';
     // $('#mensajeModal').modal('show');
      this.$router.push('/producto')
    },
    },
    mounted() {
      this.obtenerCategorias();
    },
    validations: {
        nombre: {
            required
        },
        descripcion: {
            required
        },
        codigo: {
            required
        },
        stock_minimo: {
            required
        },
        precio_venta: {
            required
        },
        fecha_vencimiento: {
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