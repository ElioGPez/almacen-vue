<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>Analisis de datos</b>
      </h1>
    </div>
    <br />

  <div class="card">
    <div class="container">
      <div class="card">
        <div class="row">
          <div class="subtitulo col-12"><h4>Ventas</h4></div>
          <div class="col-6">
            <br>
            <h4>Dinero obtenido ($)</h4>
    <div class="bar" id="vuechart-example">
      <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
    </div>            <br>
          </div>
          <div class="col-6">
            <br>
            <h4>Cantidad</h4>
    <div class="bar" id="vuechart-example">
      <apexchart type="bar"  :options="chartOptions2" :series="series2"></apexchart>
    </div>            <br>
          </div>
          
          <div class="subtitulo col-12"><h4>Productos</h4></div>
          <div class="col-6">
            <br>
            <h4>Mas vendidos</h4>
    <div class="bar" id="vuechart-example">
      <apexchart type="bar"  :options="chartOptions3" :series="series3"></apexchart>
    </div>             <br>
          </div>
        </div>
      </div>
      <!--iv class="loader" id="loader">Loading...</div-->
    </div>
  </div>



  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  data() {
    return {
      series : [],
      series2 : [],
      chartOptions2: {
        chart: {
          id: "vuechart-example"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,

          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        }
      },
      ventas: [],
  series3: [],
  chartOptions3: {
            chart: {
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
    colors: ['#F44336', '#E91E63', '#9C27B0'],
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
],
              labels: {
                style: {
    //colors: ['#F44336', '#E91E63', '#9C27B0'],
                  fontSize: '12px'
                }
              }
            }
          },
      productos: [],
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return "$" + val;
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        }
      },
    };
  },
  methods: {
    onChartReady() {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;

        var categorias = [];
        var datos = [];
        var datos2 = [];

        this.ventas.reverse().forEach(function(valor, indice, array) {
          categorias.push("Dia " + valor.Dia);
          datos.push(valor.total);
          datos2.push(valor.cantidad);
        });
        console.log(categorias);
        console.log(datos);
        console.log(datos2);

        this.chartOptions = {
          xaxis: { categories: categorias },
          colors: "rgb(57, 223, 159)"
        };
        this.chartOptions2 = {
          xaxis: { categories: categorias },
          colors: "rgb(0, 77, 177)"
        };
        this.series = [
          {
            name : "Dinero obtenido",
            data: datos
          }
        ];
        this.series2 = [
          {
            name : "Cantidad vendida",
            data: datos2
          }
        ];
      });
      axios.get("api/venta/productos").then(response => {
        this.productos = response.data;
                
        var categorias = [];
        var datos = [];

        this.productos.reverse().forEach(function(valor, indice, array) {
          categorias.push("Dia " + valor.Producto);
          datos.push(valor.Cantidad);
        });

        this.chartOptions3 = {
          xaxis: { categories: categorias }
        };
        this.series3 = [
          {
            name : "Cantidad",
            data: datos
          }
        ];

      });
    }
  },
  mounted() {
    this.onChartReady();
  },
  components: {
   // graficos,
    apexchart: VueApexCharts
  }
};
</script>
<style>
  .bar {
    background-color: rgb(255, 255, 255);
  }
</style>