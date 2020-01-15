<template>
    <div>
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
            <h3 style="color:white;">Editar producto: {{item.nombre}}</h3>
          </div>
          <div class="modal-body">



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
                  <option v-for="item of item[1]" :key="item.id" :value="item.id">{{item.categoria}}</option>
                </select>
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Nombre</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].nombre" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Descripcion</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].descripcion" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Stock Minimo</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].stock_minimo" type="number" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Precio Venta</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].precio_venta" type="number" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Codigo</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].codigo" type="text" class="form-control">
              </div>
          </div>
          <div class="center row">
              <div class="col-2">
                <label for>Fecha de Vencimiento</label>
              </div>
              <div class="col-10">
                <input v-model="item[0].fecha_vencimiento" type="date" class="form-control">
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
    </div>
</template>

<script>
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
            listado_categorias : [],
            categoria_id :'',
        }
    },
    props: {
        item : ''
    }
}
</script>