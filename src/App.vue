<template>
  <div id="app">
    <section class="hero is is-fullheight">
      <div class="hero-body">
        <div class="container chart">
          <elo-chart v-if="eloLoaded" :players="players" :elos="elos"></elo-chart>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import eloChart from './EloChart.vue'
import axios from './axios-foos.js'
export default {
  name: 'app',
  data () {
    return {
      players: [],
      elos: [],
      eloLoaded: false
    }
  },
  components: {
    eloChart
  },
  created() {
    axios.get('/elos')
    .then( res => {
        this.players = res.data.players
        this.elos = res.data.elos
        this.$nextTick( () => {
          this.eloLoaded = true
        })
    })
		.catch(error => console.log(error))
  }
}
</script>

<style lang="scss">
.chart.container {
  height: 100%;
}
</style>
