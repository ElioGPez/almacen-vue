<template>
    <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>CATEGORIAS</b>
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

      <form class="card-body">
        <div v-if="carga==0" class="loader" id="loader">Loading...</div>

        <div v-else class="form-group">
      <div  align="left">
        <router-link style="color:white;" to="/categoria_nueva">
          <button style="margin:3px;" class="btn btn-info"><i class="fas fa-plus-circle"></i> CATEGORIA</button>
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
                      <th>Categoria</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                    <paginate name="categoria" :list="filtroListado" :per="4" tag="tbody">
                    <tr v-for="cat in paginated('categoria')" :key="cat.id">
                      <td data-label="Votos">
                        {{cat.id}}
                      </td>
                      <td data-label="fecha">
                        {{cat.categoria}}                     
                        </td>
                      <td data-label="Producto">
                        <a href>
                          <router-link :to="{
                            name : 'venta',
                            params : {id : cat.id}
                          }">
                            <button class="btn-icon btn btn-warning">
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

          <paginate-links for="categoria" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

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
            listado_categorias:[],
            filtro : '',
            paginate: ['categoria'],
            carga : 0
        }
    },
    methods: {
      getResults(page = 1) {
        //console.log(localStorage.getItem('token'))
			axios.get('api/categoria?page=' + page)
				.then(response => {
          this.carga = 1;
          this.listado_categorias = response.data;
          console.log(this.listado_categorias);
				});
        },
        busqueda(){
            console.log(this.listado_categorias.filter((item) => 
            {item.categoria.match(this.filtro);})
            );
        }
    },
      mounted() {
		this.getResults();
  },
  computed: {
      filtroListado(){
            var cat = this.listado_categorias.filter((item) => 
            {
              return item.categoria.toLowerCase().match(this.filtro.toLowerCase());
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
                nulo.categoria = "No hay elementos que coincidan";
                var nulos = [nulo];
                return nulos;
              }
      }
  },
}
</script>