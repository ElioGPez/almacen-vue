<template>
    <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>CLIENTES</b>
      </h1>
    </div>
    <br>
    <div class="card">
      <div class="row">
            <div class="center col-2">
                <p><i class="fas fa-search"></i> Buscar</p>
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
        <router-link style="color:white;" to="/cliente_nuevo">
          <button style="margin:3px;" class="btn btn-info"><i class="fas fa-plus-circle"></i> CLIENTE</button>
        </router-link>
      </div>

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
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Telefono</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                    <paginate name="cliente" :list="filtroListado" :per="2" tag="tbody">
                    <tr v-for="cat in paginated('cliente')" :key="cat.id">
                      <td data-label="Votos">
                        {{cat.id}}
                      </td>
                      <td data-label="fecha">
                        {{cat.nombre}}                     
                      </td>
                      <td data-label="fecha">
                        {{cat.apellido}}                     
                      </td>
                      <td data-label="fecha">
                        {{cat.dni}}                     
                      </td>
                      <td data-label="fecha">
                        {{cat.telefono}}                     
                      </td>
                      <td data-label="Acciones">
                        <a href>
                      <router-link :to="{
                        name : 'cuenta',
                        params : {id : cat.id}
                      }">
                      <button class="btn-icon btn btn-warning">
                        <i class="far fa-user"></i>
                      </button>        
                      </router-link>
                        </a>
                        <a href>
                      <router-link :to="{
                        name : 'cliente_modificar',
                        params : {id : cat.id}
                      }">
                      <button class="btn-icon btn btn-warning">
                        <i class="far fa-edit"></i>
                      </button>        
                      </router-link>
                        </a>
                        <a href>
                          <button @click.prevent="eliminarModal(cat.id,index);"
                          data-toggle="modal" data-target="#exampleModal" 
                           class="btn-icon btn btn-danger">
                            <i class="fas fa-trash-alt"></i>
                          </button>
                        </a>
                      </td>
                    </tr>
                  </paginate>
                </table>
              </div>
            </fieldset>
            <br>

          </div>

          <paginate-links for="cliente" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>

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
            listado_clientes:[],
            filtro : '',
            paginate: ['cliente'],
            carga : 0
        }
    },
    methods: {
      		getResults() {
			axios.get('api/cliente')
				.then(response => {
          this.carga = 1;

          this.listado_clientes = response.data;
          console.log(this.listado_clientes);
				});
        },
        busqueda(){
            console.log(this.listado_clientes.filter((item) => 
            {item.nombre.match(this.filtro);})
            );
        }
    },
      mounted() {
		this.getResults();
  },
  computed: {
      filtroListado(){
            var cat = this.listado_clientes.filter((item) => 
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