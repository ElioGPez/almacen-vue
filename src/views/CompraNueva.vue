<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>REGISTRO DE COMPRAS</b>
      </h1>
    </div>
    <br />
    <div>
      <div class="form-group">
        <div class="card container">
          <!-- Cliente -->
          <br>
          <div class="row">
              
              <div class="center col-2">
                  <p>PROVEEDOR</p>
              </div>
              <div class="col-2">
                <button
                  data-toggle="modal"
                  data-target="#clientes_modal"
                  type="button"
                  class="btn"
                >BUSCAR</button>
              </div>
                <div class="col-3">
                <input v-model="razon_social" type="text" class="form-control" readonly />
                </div>
          </div>
          <div class="row">
              <div class="center col-2">
                  <p>PRODUCTO</p>
              </div>
              <div class="col-2">
                <button
                  data-toggle="modal"
                  data-target="#productos_modal"
                  type="button"
                  class="btn"
                >BUSCAR</button>
              </div>
                <div class="col-3">
                <input v-model="nombre" type="text" class="form-control" readonly />
                </div>
            <div class="center col-2">
                <p>CODIGO</p>
            </div>
            <div class="col-2">
                <input id="codigo" v-on:keyup.enter="buscarProducto()" v-model="codigo" type="number" class="form-control"/>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="center col-2">
                <p>COSTO</p>
            </div>
            <div class="col-4">
                <input v-model="costo" type="number" class="form-control" />
            </div>
            <div class="center col-1.5">
                <p>CANTIDAD</p>
            </div>
            <div class="col-4">
                <input v-on:keyup.enter="agregarProducto()" v-model="cantidad" type="number" class="form-control"  />
            </div>
          </div>
          <div class="row">
                <div style="margin-left:40px;" class="col-1.5 custom-control custom-checkbox center">
                  <input
                    v-model="r_vencimiento"
                    @change="vencimientoActivo($event)"
                    type="checkbox"
                    class="custom-control-input"
                    id="check-vencimiento"
                  />
                  <label class="custom-control-label" for="check-vencimiento">VENCIMIENTO</label>
                </div>
            <div class="col-3">
                <input v-model="vencimiento" type="date" class="form-control" :disabled="r_vencimiento == 0" />
            </div>
                <div class="col-2.5 custom-control custom-checkbox center">
                  <input
                    v-model="r_precio_venta"
                    @change="precioVentaActivo($event)"
                    type="checkbox"
                    class="custom-control-input"
                    id="check-turno"
                  />
                  <label class="custom-control-label" for="check-turno">PRECIO DE VENTA</label>
                </div>
            <div class="col-2">
                <input v-model="precio_venta" type="number" class="form-control" :disabled="r_precio_venta == 0" />
            </div>
            <div class="col-2">
                <button
                  @click="agregarProducto()"
                  type="button"
                  class="btn"
                >AGREGAR</button>            
            </div>
          </div>
        <br>
        </div>
        <br />
        <!-- Tabla -->
        <div class="form-group card container">
          <br />
          <fieldset>
            <div class>
              <table
                class="table table-striped table-bordered table-condensed table-hover"
                style="background-color:white"
              >
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Costo</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of linea_compra" :key="item.id">
                    <td data-label="Votos">
                      <a href>
                        <button
                          class="btn btn-warning"
                          @click.prevent="linea_compra.splice(index,1);actualizar()"
                        >X</button>
                      </a>
                    </td>
                    <td data-label="Producto">{{item.producto.nombre}}</td>
                    <td data-label="Producto">{{item.cantidad}}</td>
                    <td data-label="Producto">${{item.costo}}</td>
                    <td data-label="Producto">{{item.subtotal}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </fieldset>
          <!-- Total -->
          <div>
            <hr />
            <h4 align="right">
              TOTAL
              <b style="color:green;">${{total}}</b>
            </h4>
          </div>
        </div>
        <!-- Botones de Accion -->
        <div class="continer card">
          <!-- Boton para registrar la Venta -->
          <div align="center">
            <div class="registrar">
              <button
                type="button"
                class="btn btn-lg btn-block"
                @click="registrarCompra()"
              >
                <b>REGISTRAR</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal PROVEEDORES-->
    <div
      id="clientes_modal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" style="background-color: #3a0041;" class="modal-header">
            <h3 style="color:white;">PROVEEDORES</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-2 center">
                <p>Nombre:</p>
              </div>
              <div class="col-4">
                <input v-model="filtro2" type="text" class="form-control" placeholder />
              </div>
            </div>
            <hr />
            <div class="row">
              <!-- Tabla -->
              <div class="form-group col-12">
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
                        </tr>
                      </thead>
                      <paginate name="proveedor" :list="filtroListadoP" :per="2" tag="tbody">
                        <tr @click="seleccionarProveedor(item)" v-for="item in paginated('proveedor')" :key="item.id">
                          <td data-label="Votos">{{item.id}}</td>
                          <td data-label="fecha">{{item.razon_social}}</td>
                          <td data-label="fecha">{{item.cuit}}</td>
                          <td data-label="Producto">{{item.email}}</td>
                          <td data-label="fecha">{{item.telefono}}</td>
                        </tr>
                      </paginate>
                    </table>
                  </div>
                </fieldset>
                  <paginate-links for="proveedor" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
                <br />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal PRODUCTOS-->
    <div
      id="productos_modal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div align="center" style="background-color: #3a0041;" class="modal-header">
            <h3 style="color:white;">PRODUCTOS</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-2 center">
                <p>Nombre:</p>
              </div>
              <div class="col-4">
                <input v-model="filtro" type="text" class="form-control" />
              </div>
            </div>
            <hr />
            <div class="row">
              <!-- Tabla -->
              <div class="form-group col-12">
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

                    </tr>
                  </thead>
                    <paginate name="producto" :list="filtroListado" :per="2" tag="tbody">
                    <tr @click="seleccionarProducto(item)" v-for="item in paginated('producto')" :key="item.id">
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

                    </tr>
                  </paginate>
                </table>
                  </div>
                </fieldset>
                  <paginate-links for="producto" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
                <br />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
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
        <h3>{{mensaje}}</h3>
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


export default {
  data() {
    return {
      total: 0,
      linea_compra: [],
      cliente: "",
      codigo: "",
      nombre : '',
      cantidad: '',
      costo : '',
      producto: "",
      proveedor: "",
      productos: [],
      //Opcionales
      vencimiento : '',
      precio_venta : '',
      //Modal
      listado_productos : [],
      listado_proveedores : [],
      filtro : '',
      filtro2 : '',
      paginate: ['producto','proveedor'], 
      mensaje: '',
      //Radios
      r_vencimiento : 0,
      r_precio_venta : 0,
      razon_social : ''
    };
  },
  methods: {
    actualizar() {
      this.total = 0;
      for (var item of this.linea_compra) {
        this.total += item.subtotal;
      }
    },    
    getResults() {
        document.getElementById("codigo").focus();
			axios.get('api/producto')
				.then(response => {
          this.listado_productos = response.data[0].productos;
          console.log(this.listado_productos);
        });
        axios.get('api/proveedor')
				.then(response => {
          this.listado_proveedores = response.data;
          console.log(this.listado_proveedores);
				});
    },
    seleccionarProducto(item){
      console.log(item.nombre);
      this.producto = item;
      $('#productos_modal').modal('hide');
      this.codigo = item.codigo;
      this.nombre = item.nombre + ' - ' + item.descripcion; 
    },
    seleccionarProveedor(item){
      console.log(item.nombre);
      this.proveedor = item;
      this.razon_social = item.razon_social;
      $('#clientes_modal').modal('hide');
    },
    vencimientoActivo(event){
      if(this.r_vencimiento){
        this.r_vencimiento = 1;
      }else{
        this.r_vencimiento = 0;
      }
    },
    precioVentaActivo(event){
      if(this.r_precio_venta){
        this.r_precio_venta = 1;
      }else{
        this.r_precio_venta = 0;
      }
    },
     agregarProducto: function(){
        //console.log('Hola');
           var linea = new Object();
           linea.id = this.producto.id;
           linea.producto = this.producto;
           linea.cantidad = this.cantidad;
           linea.costo = this.costo;
           linea.subtotal = this.cantidad*this.costo;
           linea.precio_venta = this.precio_venta;
           linea.vencimiento = this.vencimiento;
           this.total +=linea.subtotal;
           this.linea_compra.push(linea);

           this.limpiar();
     },
     limpiar(){
       this.cantidad = '';
       this.costo = '';
       this.nombre = '';
       this.codigo = '';
       this.vencimiento = '';
       this.precio_venta = '';
       
     },
     buscarProducto(){
       var item = this.listado_productos.find(
          x => x.codigo == this.codigo
        );
        this.seleccionarProducto(item);
        console.log(item);

     },
     registrarCompra(){
      if (this.linea_compra.length != 0) {
        var url = "api/compra";
        axios
          .post(url, {
            proveedor_id : this.proveedor.id,
            linea_compra: this.linea_compra,
            total: this.total,
            empleado_id : JSON.parse(localStorage.getItem('usuario')).id
          })
          .then(response => {
          $('#mensajeModal').modal('show');
            console.log(response.data);
            this.limpiarRegistro();
            this.mensaje = "Compra REGISTRADA!!";
        document.getElementById("codigo").focus();

          });
      }        
      },
      limpiarRegistro(){
       this.linea_compra = [];
       this.total = 0;
       this.producto = '';
       this.proveedor = '';
       this.razon_social = '';
       this.nombre = ''
     },
  },mounted() {
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
      },
        filtroListadoP(){
            var cat = this.listado_proveedores.filter((item) => 
            {
              return item.razon_social.toLowerCase().match(this.filtro2.toLowerCase());
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
      },
  },
};
</script>
<style>
.registrar {
  padding-top: 5px;
  padding-bottom: 5px;
}
.registrar {
  margin-left: 100px;
  margin-inline-end: 100px;
}
.btn:hover {
  background-color: #770a83;
  border-color: rgb(71, 8, 68);
  color: aliceblue;
}

.form-check .custom-control-label {
  padding-left: 10px;
  padding-top: 4px;
}
.form-check .activo label {
  padding-left: 10px;
}
.div-activo {
  padding-left: 22px;
}

.form-check .custom-control-label::after,
.form-check .custom-control-label::before {
  height: 25px;
  width: 25px;
}
.form-check .custom-control-label::before {
  background-color: #fff;
  border: 1px solid #2c2b2c;
}

/* When I remove background the icon goes back to that default size */
.custom-control-input:checked ~ .custom-control-label::before {
  background-color: rgb(66, 10, 73) !important;
}
.center label {
  font-size: 18px;
}
.center p {
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}
</style>