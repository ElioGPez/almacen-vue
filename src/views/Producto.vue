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
                <input id="producto" v-model="filtro" type="text" class="form-control" />
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
                      <th>ID</th>
                      <th>Codigo</th>
                      <th>Nombre</th>
                      <th>Descripcion </th>
                      <th>Stock</th>
                      <th>Precio</th>
                      <th>Acciones</th>

                    </tr>
                  </thead>
                    <paginate name="producto" :list="filtroListado" :per="8" tag="tbody">
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
                          <!--router-link :to="{
                            name : 'venta_detalle',
                            params : {id : item.id}
                          }"-->
                            <button 
                            data-toggle="modal"
                            ata-target="#modal_pendiente"
                              @click.prevent="editar(item)"
                             class="btn btn-warning">
                              <i class="far fa-edit"></i>
                            </button>        
                          <!--/router-link-->
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




        <div
      id="modal_pendiente"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" style="background-color: #3a0041;" class="modal-header">
            <h3 style="color:white;">Editar producto: Bla</h3>
          </div>
          <div class="modal-body">



    <div class="card">
      <form id="form" class="card-body" @submit.prevent="editarProducto()">
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
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Nombre</label>
              </div>
              <div class="col-10">
                <input v-model="nombre" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Descripcion</label>
              </div>
              <div class="col-10">
                <input v-model="descripcion" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Stock Minimo</label>
              </div>
              <div class="col-10">
                <input v-model="stock_minimo" type="number" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Precio Venta</label>
              </div>
              <div class="col-10">
                <input v-model="precio_venta" type="number" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Codigo</label>
              </div>
              <div class="col-10">
                <input v-model="codigo" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Fecha de Vencimiento</label>
              </div>
              <div class="col-10">
                <input v-model="fecha_vencimiento" type="date" class="form-control">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>



    <!-- Modal -->

    <!--EditarProducto :item="producto"></EditarProducto-->



    </div>
</template>
<script>
import axios from "axios";
import EditarProducto from "@/components/EditarProducto.vue";

export default {
   components: {
    EditarProducto,
  },   
    data() {
        return {
            listado_productos:[],
            listado_categorias:[],
            filtro : '',
        paginate: ['producto'],
        
            nombre : '',
            descripcion : '',
            categoria : '',
            codigo : '',
            stock_minimo : '',
            precio_venta : '',
            fecha_vencimiento : '',
            categoria_id : '0',
            listado_categorias : [],
            categoria_id :'0',
            producto : [],

            carga : 0
        }
    },
    methods: {
      editarProducto(){
      let datos = new FormData();
      this.producto.nombre = this.nombre;
      this.producto.descripcion = this.descripcion;
      this.producto.stock_minimo = this.stock_minimo;
      this.producto.precio_venta = this.precio_venta;
      this.producto.fecha_vencimiento = this.fecha_vencimiento;
      this.producto.categoria_id = this.categoria_id;
      this.producto.codigo = this.codigo;
      this.producto.nombre = this.nombre;

        console.log(this.producto.id);
        axios.put("api/producto/"+this.producto.id,this.producto).then(response => {
          console.log(response.data);
                      this.mensaje = "PRODUCTO MODIFICADO!!"

        });
      },
      editar(item){
        console.log('Editar activado ');
        $("#modal_pendiente").modal("show");
        this.producto = item;
        /*this.producto.push(item);
        this.producto.push(this.listado_categorias);*/
        this.nombre = item.nombre;
        this.descripcion = item.descripcion;
        this.codigo = item.codigo;
        this.stock_minimo = item.stock_minimo;
        this.precio_venta = item.precio_venta;
        this.fecha_vencimiento = item.fecha_vencimiento;
        this.categoria_id = item.categoria_id;
      },
      		getResults() {
                    document.getElementById("producto").focus();

      axios.get('api/producto')
      
				.then(response => {
          console.log(response.data[0].productos);
          this.carga = 1;
          this.listado_productos = response.data[0].productos;
          this.listado_categorias = response.data[0].categorias;
                    this.producto.push(response.data[0].productos[0]);
          this.producto.push(this.listado_categorias);
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
              return item.nombre.toLowerCase().match(this.filtro.toLowerCase())||item.codigo.toLowerCase().match(this.filtro.toLowerCase());
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