<template>
  <div class="menu container">
    <!-- TITULO -->
    <div>
      <h1 class="titulo">
        <b>Analisis de datos</b>
      </h1>
    </div>
    <br />
    <graficos></graficos>

    <div id="vuechart-example">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import graficos from "@/views/ChartBar.vue";
import VueApexCharts from "vue-apexcharts";
import axios from "axios";

export default {
  data() {
    return {
      ventas: [],
      chartOptions: {
        chart: {
          id: "vuechart-example"
        },
       /* xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        },
  legend: {
    show: true,
        position: 'top'

  },*/
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
      /*series: [
        {
          name: "Dinero obtenido",
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }
      ]*/
    };
  },
  methods: {
    onChartReady(chart, google) {
      axios.get("api/venta/estadisticas").then(response => {
        this.ventas = response.data;

        var categorias = [];
        var datos = [];

        this.ventas.reverse().forEach(function(valor, indice, array) {
          categorias.push("Dia " + valor.Dia);
          datos.push(valor.total);
        });
        console.log(categorias);
        console.log(datos);

        this.chartOptions = {
          xaxis: { categories: categorias },
          colors: "rgb(57, 223, 159)"
        };
        this.series = [
          {
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
    graficos,
    apexchart: VueApexCharts
  }
};
</script>
