<template>
  <div class="columns">
      <div class="column is-9-desktop is-10-fullhd">
        <!-- <div class="tabs">
          <ul>
            <li :class="{isActive: eloChart}"><a>Elo</a></li>
            <li><a>Points Scored</a></li>
            <li><a>King</a></li>
            <li><a>Special Events</a></li>
            <li><a>Game Stats</a></li>
          </ul>
        </div> -->
        <component :is="elo-chart" :players="players" :elos="elos" :height="600" :width="1000"></component>
        <elo-chart v-if="eloLoaded" :players="players" :elos="elos" :height="600" :width="1000" ></elo-chart>
      </div>
      <div class="column is-3-desktop is-2-fullhd">
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
  props: {
    name: {required: true}
  },
  components: {
    eloChart,
    gameFeed
  },
  created() {
    axios.get(`/elos/${this.name}`)
      .then( res => {
          console.log('elos', res)
          this.players = res.data.players
          this.elos = res.data.elos
          this.$nextTick( () => {
            this.eloLoaded = true
          })
      })
      .catch(error => console.log(error))
    
    axios.get(`/gamehistory/${this.name}`)
      .then( res => {
          console.log('gamehistory', res)
          this.gameHistory = res.data.games
          this.gameHistory = this.gameHistory.map( (game, index) => {
            game.gameNumber = index + 1
            return game
          })
          this.gameHistory.reverse()
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
