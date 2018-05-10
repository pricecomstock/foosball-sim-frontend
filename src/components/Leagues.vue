<template>
  <div class="columns">
      <div class="column is-9">
        <elo-chart v-if="eloLoaded" :players="players" :elos="elos" :height="600" :width="1000"></elo-chart>
      </div>
      <div class="column is-3">
        <game-feed :game-list="gameHistory"></game-feed>
      </div>
    </div>
</template>

<script>
import eloChart from './EloChart.vue'
import gameFeed from './GameFeed.vue'
import axios from '../axios-foos.js'
export default {
  data () {
    return {
      players: [],
      elos: [],
      eloLoaded: false,
      gameHistory: []
    }
  },
  components: {
    eloChart,
    gameFeed
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
    
    axios.get('/gamehistory')
      .then( res => {
          console.log(res)
          this.gameHistory = res.data.games
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
