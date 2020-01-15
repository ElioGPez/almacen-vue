<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>REGISTRO DE VENTAS</b>
      </h1>
    </div>
    <br />
    <div>
      <div class="form-group">
        <div class="card container">
          <!-- Cliente -->
          <div class="row">
            <div class="col-2">
              <div class="form-check">
                <div class="custom-control custom-checkbox center">
                  <input
                    v-model="cliente_r"
                    @change="clienteSeleccionado($event)"
                    type="checkbox"
                    class="custom-control-input"
                    id="check-turno"
                  />
                  <label class="custom-control-label" for="check-turno">CLIENTE</label>
                </div>
              </div>
            </div>
            <div class="col-4 row">
              <div class="col-2" align="center">
                <button 
                  data-toggle="modal"
                  :disabled="cliente_r == 0"
                  data-target="#clientes_modal" type="button" class="btn">...</button>
              </div>
              <div class="col-10">
                <input v-model="cliente.nombre" type="text" class="form-control" readonly />
              </div>
            </div>
          <!-- div class="col-6 row">
                <div style="margin-left:40px;" class="col-3 custom-control custom-checkbox center">
                  <input
                    v-model="r_fecha"
                    @change="vencimientoActivo($event)"
                    type="checkbox"
                    class="custom-control-input"
                    id="check-vencimiento"
                  />
                  <label class="custom-control-label" for="check-vencimiento">FECHA</label>
                </div>
            <div class="col-4">
                <input v-model="fecha" type="date" class="form-control" :disabled="r_fecha == 0" />
            </div>
            <div class="col-2 center">
                <p for="codigo">HORA</p>
            </div>
            <div class="col-2">
                <input v-model="hora" type="number" class="form-control" :disabled="r_fecha == 0" placeholder="00" />
            </div>
          </div-->

          </div>

          <hr />
          <!-- Lista Producto y Boton -->
          <div class="form-group">
            <div class="row">
              <div class="col-1" align="center">
                <button
                  data-toggle="modal"
                  data-target="#productos_modal"
                  type="button"
                  class="btn"
                >...</button>
              </div>
              <div class="col-1 center">
                <p for="codigo">CODIGO</p>
              </div>
              <div class="col-3">
                <input id="codigo" v-on:keyup="bla($event)" v-on:keyup.enter="obtenerProducto()" v-model="codigo" type="text" class="form-control" placeholder="Codigo" />
              </div>
              <div class="col-2 center">
                <p for="codigo">CANTIDAD</p>
              </div>
              <div class="col-3">
                <input id="cantidad" v-model="cantidad" v-on:keyup="bla2($event)" type="number" class="form-control" placeholder="Cantidad" />
              </div>
              <div class="col-2">
                <button @click="obtenerProducto()" type="button" class="btn">AGREGAR</button>
              </div>
            </div>
          </div>
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
                    <th>Precio</th>
                    <th>SubTotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) of linea_venta" :key="item.id">
                    <td data-label="Votos">
                      <a href>
                        <button
                          class="btn btn-warning"
                          @click.prevent="linea_venta.splice(index,1);actualizar()"
                        >X</button>
                      </a>
                    </td>
                    <td data-label="Producto">{{item.producto.nombre}}</td>
                    <td data-label="Producto">{{item.cantidad}}</td>
                    <td data-label="Producto">${{item.precio}}</td>
                    <td data-label="Producto">${{item.subtotal}}</td>
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
                @click="registrarVenta()"
                data-toggle="modal"
                data-target="#mensajeModal"
              >
                <b>REGISTRAR</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal CLIENTES-->
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
            <h3 style="color:white;">CLIENTES</h3>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-2 center">
                <p>Nombre:</p>
              </div>
              <div class="col-4">
                <input v-model="filtro_n" type="text" class="form-control" />
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
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI </th>
                      <th>Telefono</th>
                      <th>Estado</th>

                    </tr>
                  </thead>
                    <paginate name="cliente" :list="filtroClientes" :per="2" tag="tbody">
                    <tr @click="seleccionarCliente(item)" v-for="item in paginated('cliente')" :key="item.id">
                      <td data-label="ID">
                        {{item.id}}
                      </td>
                      <td data-label="codigo">
                        {{item.nombre}}                     
                      </td>
                      <td data-label="nombre">
                        {{item.apellido}}                     
                      </td>
                      <td data-label="descripcion">
                        {{item.dni}}                     
                      </td>
                      <td data-label="stock">
                        {{item.telefono}}                     
                      </td>
                      <td data-label="precio">
                        {{item.estado}}                     
                      </td>

                    </tr>
                  </paginate>
                </table>
                  </div>
                </fieldset>
                  <paginate-links for="cliente" :classes="{'ul': 'pagination', 'li': 'page-item', 'a': 'page-link'}"></paginate-links>
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

export default {

  data() {
    return {
      total: 0,
      linea_venta: [],
      cliente: "",
      codigo: "",
      cantidad: 1,
      producto: "",
      productos: [],
      cliente_id : '',
      cliente_r : 0,
      r_fecha : '',
      fecha: '',
      //Modal
      listado_productos : [
        {nombre:''}
      ],
      filtro : '',
      filtro_n : '',
      paginate: ['cliente','producto'], 
      mensaje: '',
      listado_clientes : [],
    };
  },
  methods: {
    bla(event){
      if(event.key == '+'){
        document.getElementById("cantidad").focus();
        this.codigo = this.codigo.replace(/[+]/g, ''); 
      this.cantidad = '';

      }
      //console.log(event.key)
    },
    bla2(event){
      if(event.key == '1'||
      event.key == '2'||
      event.key == '3'||
      event.key == '4'||
      event.key == '5'||
      event.key == '6'||
      event.key == '7'||
      event.key == '8'||
      event.key == '9')
      {
        document.getElementById("codigo").focus();
        //this.codigo = this.codigo.replace(/[+]/g, ''); 

      }
      //console.log(event.key)
    },
    actualizar() {},
    establecerFecha(){
        console.log('pasa')
        var n = new Date();
        //Año
        var y = n.getFullYear();
        //Mes
        var m = n.getMonth() + 1;
        //Día
        var d = n.getDate();
        console.log(y + "/" + m + "/" + d)        
        this.fecha = y + "/" + m + "/" + d;
    },
    getResults() {
          document.getElementById("codigo").focus();

      this.establecerFecha();
			axios.get('api/producto')
				.then(response => {
          this.listado_productos = response.data[0].productos;
          console.log(this.listado_productos);
        });
      axios.get('api/cliente')
				.then(response => {
          this.listado_clientes = response.data;
          console.log(this.listado_clientes);
        });
    },
    seleccionarProducto(item){
      console.log(item.nombre);
      this.producto = item;
      $('#productos_modal').modal('hide');
      this.codigo = item.codigo;
      //this.nombre = item.nombre + ' - ' + item.descripcion; 
    },
    seleccionarCliente(item){
      console.log(item.nombre);
      this.cliente = item;
      $('#clientes_modal').modal('hide');
    },
    obtenerProducto(){
       var item = this.listado_productos.find(
          x => x.codigo == this.codigo
        );
        console.log(item.producto);
        //Agregar mensaje de codigo incorrecto
        if(item != null){
          this.producto = item;
          this.agregarLineaDeVenta();
        }
    },
    agregarLineaDeVenta(){
          var linea = new Object();
          linea.id = this.producto.id;
          //linea.imagen = item.imagen;
          linea.producto = this.producto;
          linea.cantidad = this.cantidad;
          linea.precio = this.producto.precio_venta;
          linea.subtotal = this.cantidad * this.producto.precio_venta;
          //linea.categoria_id = this.tipo;

          this.total += linea.subtotal;
          this.linea_venta.push(linea);
          this.producto = '';
          this.codigo = '';
          this.cantidad = 1;
          //this.limpiar();
    },
    registrarVenta() {
      if (this.linea_venta.length != 0) {
      console.log("El id del empleado es: "+JSON.parse(localStorage.getItem('usuario')).id);

        var urlVenta = "api/venta";
        axios
          .post(urlVenta, {
            cliente_id : this.cliente.id,
            linea_venta : this.linea_venta,
            empleado_id : 1,
            total: this.total
          })
          .then(response => {
            console.log(response.data);
            this.limpiar();
            //this.limpiarRegistro();*/
            this.mensaje = "Venta REGISTRADA!!";
            document.getElementById("codigo").focus();

          });
      }
    },
    limpiar(){
      this.cliente_id = '';
      this.linea_venta = [];
      this.empleado_id = '';
      this.total = 0;
      this.cliente = ''; 
    },
    clienteSeleccionado(event){
      vent.target.value
      if(this.cliente_r){
        this.cliente_r = 1;
      }else{
        this.cliente_r = 0;
        this.cliente = '';
      }
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
      },
      filtroClientes(){
            var cat = this.listado_clientes.filter((item) => 
            {
              return item.nombre.toLowerCase().match(this.filtro_n.toLowerCase());
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