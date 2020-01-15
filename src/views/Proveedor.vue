<template>
    <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>PROVEEDORES</b>
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
        <router-link style="color:white;" to="/proveedor_nuevo">
          <button style="margin:3px;" class="btn btn-info"><i class="fas fa-plus-circle"></i> PROVEEDOR</button>
        </router-link>
      </div>
      <form class="card-body">
        <div v-if="carga==0" class="loader" id="loader">Loading...</div>

        <div v-else class="form-group">
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
                      <th>Razon Social</th>
                      <th>CUIT</th>
                      <th>Email</th>
                      <th>Telefono</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                    <paginate name="proveedor" :list="filtroListado" :per="4" tag="tbody">
                    <tr v-for="cat in paginated('proveedor')" :key="cat.id">
                      <td data-label="id">
                        {{cat.id}}
                      </td>
                      <td data-label="razon_social">
                        {{cat.razon_social}}                     
                      </td>
                      <td data-label="cuit">
                        {{cat.cuit}}                     
                      </td>
                      <td data-label="email">
                        {{cat.email}}                     
                      </td>
                      <td data-label="telefono">
                        {{cat.telefono}}                     
                      </td>
                      <td data-label="acciones">
                        <a href>
                          <router-link :to="{
                            name : 'venta',
                            params : {id : cat.id}
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

          <paginate-links for="proveedor" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

        </div>
                          <br>           
      </form>

    </div>

  







    </div>
</template>
<script>    
import axios from "axios";

export default {
    data() {
        return {
            listado_proveedores:[],
            filtro : '',
            paginate: ['proveedor'],
            carga:0
        }
    },
    methods: {
      getResults(page = 1) {
        //console.log(localStorage.getItem('token'))
			axios.get('api/proveedor?page=' + page)
				.then(response => {
        this.carga = 1;
          this.listado_proveedores = response.data;
          console.log(this.listado_proveedores);
				});
        },
        busqueda(){
            console.log(this.listado_proveedores.filter((item) => 
            {item.razon_social.match(this.filtro);})
            );
        }
    },
      mounted() {
		this.getResults();
  },
  computed: {
      filtroListado(){
            var cat = this.listado_proveedores.filter((item) => 
            {
              return item.razon_social.toLowerCase().match(this.filtro.toLowerCase());
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
                nulo.razon_social = "No hay elementos que coincidan";
                var nulos = [nulo];
                return nulos;
              }
      }
  },
}
</script>