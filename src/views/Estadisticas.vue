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

    </div>
</template>

<script>
import graficos from "@/views/ChartBar.vue";

export default {
    data() {
        return {
            
        }
    },
    components: {
        graficos
    },

}
</script>