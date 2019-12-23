<template>
    <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>PRODUCTOS</b>
      </h1>
    </div>
    <br>
    <div class="card">
      <div class="row">
            <div class="center col-2">
                <p>Buscar</p>
            </div>
            <div class="col-4">
                <input v-model="filtro" type="text" class="form-control" />
            </div>
        
      </div>
    </div>

    <!-- TABLA -->
    <br>
    <div id="cardlist" class="card">
      <div  align="left">
        <router-link style="color:white;" to="/producto_nuevo">
          <button style="margin:3px;" class="btn btn-info"><i class="fas fa-plus-circle"></i> PRODUCTO</button>
        </router-link>
      </div>
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
                      <th>ID</th>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Descripcion </th>
                      <th>Stock</th>
                      <th>Precio</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                    <paginate name="producto" :list="filtroListado" :per="2" tag="tbody">
                    <tr v-for="item in paginated('producto')" :key="item.id">
                      <td data-label="ID">
                        {{item.id}}
                      </td>
                      <td data-label="codigo">
                        {{item.codigo}}                     
                      </td>
                      <td data-label="nombre">
                        {{item.nombre}}                     
                      </td>
                      <td data-label="descripcion">
                        {{item.descripcion}}                     
                      </td>
                      <td data-label="stock">
                        {{item.stock}}                     
                      </td>
                      <td data-label="precio">
                        ${{item.precio_venta}}                     
                      </td>
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

                    <paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
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
            listado_productos:[],
            filtro : '',
        paginate: ['producto']       
        }
    },
    methods: {
      		getResults() {
			axios.get('api/producto')
				.then(response => {

          this.listado_productos = response.data;
          console.log(this.listado_productos);
				});
        },
        busqueda(){
            console.log(this.listado_productos.filter((item) => 
            {item.nombre.match(this.filtro);})
            );
        }
    },
      mounted() {
      this.getResults();
  },
  computed: {
      filtroListado(){
            var cat = this.listado_productos.filter((item) => 
            {
              return item.nombre.toLowerCase().match(this.filtro.toLowerCase());
            });
            //console.log(cat.length);
            if(cat.length != 0){
              //console.log(cat);
              return cat;
            }
            else{
                //console.log('pasa');
                var nulo = new Object();
                nulo.id = 0;
                nulo.nombre = "No hay elementos que coincidan";
                var nulos = [nulo];
                return nulos;
              }
      }
  },
}
</script>