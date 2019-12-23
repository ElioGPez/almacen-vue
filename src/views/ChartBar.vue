<template>
  <div class="card">
    <div class="container">
      <div class="card">
        <div class="row">
          <div class="subtitulo col-12"><h4>Ventas</h4></div>
          <div class="col-6">
            <br>
            <h4>Dinero obtenido ($)</h4>
            <GChart type="ColumnChart" @ready="onChartReady" />
            <br>
          </div>
          <div class="col-6">
            <br>
            <h4>Cantidad</h4>
            <GChart type="ColumnChart" @ready="onChartReady2" />
            <br>
          </div>
          
          <div class="subtitulo col-12"><h4>Productos</h4></div>
          <div class="col-6">
            <br>
            <h4>Mas vendidos</h4>
            <GChart type="ColumnChart" @ready="onChartReady3" />
            <br>
          </div>
        </div>
      </div>
      <!--iv class="loader" id="loader">Loading...</div-->
    </div>
  </div>
</template>

<script>
import { GChart } from "vue-google-charts";
import axios from "axios";

export default {
  data() {
    return {
      chartData: [
        ["Fecha", "Ventas", { role: "style" }],
        ["20/12", 1000, "blue"],
        ["21/12", 300, "red"],
        ["22/12", 1600, "green"]
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      },
      ventas: []
    };
  },
  methods: {
    obtenerDatos() {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;
        
        console.log(this.ventas);
      });
    },
    onChartReady(chart, google) {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;
        
      var data2 = new google.visualization.DataTable();
      // Add columns
      data2.addColumn("string", "Dia");
      data2.addColumn("number", "Dinero obtenido por ventas ");
      
      data2.addRows(this.ventas.length);

      this.ventas.reverse().forEach(function(valor, indice, array) {
      data2.setCell(indice, 0, ('Dia '+valor.Dia));
      data2.setCell(indice, 1, valor.total);
        });
      const options = {
        title: "",
        legend: {position: 'top'},
        colors: ['#1b9e77']
      };
      chart.draw(data2, options);
      });
    },
        obtenerDatos() {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;
        
        console.log(this.ventas);
      });
    },
    onChartReady2(chart, google) {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;
        
      var data2 = new google.visualization.DataTable();
      // Add columns
      data2.addColumn("string", "Dia");
      data2.addColumn("number", "Cantidad vendida");
      
      data2.addRows(this.ventas.length);

      this.ventas.reverse().forEach(function(valor, indice, array) {
      data2.setCell(indice, 0, ('Dia '+valor.Dia));
      data2.setCell(indice, 1, valor.cantidad);
        });
      const options = {
        title: "",
        legend: {position: 'top'},
      };
      chart.draw(data2, options);
      });
    },
    onChartReady3(chart, google) {
      axios.get("api/venta/productos").then(response => {
        this.ventas = response.data;
        
      var data2 = new google.visualization.DataTable();
      // Add columns
      data2.addColumn("string", "Producto");
      this.ventas.forEach(function(valor, indice, array) {
        data2.addColumn("number", valor.Producto);
      });

      /*data2.addColumn("number", "Cantidad vendida");
      data2.addColumn("number", "Cantidad vdfd");*/

      data2.addRows(1);

      data2.setCell(0, 0, ('Productos'));
      this.ventas.forEach(function(valor, indice, array) {
      data2.setCell(0, indice+1, valor.Cantidad);
        });


      const options = {
        title: "",
        legend: {position: 'top'},
        //colors: ['#1b9e77', '#d95f02']
      };
      chart.draw(data2, options);
      });
    }
  },
  components: {
    GChart
  },
  created() {
   // this.obtenerDatos();
  }
};
</script>

<style>
</style>