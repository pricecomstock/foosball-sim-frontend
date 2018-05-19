<template>
  <div class="columns">
      <div class="column is-9-desktop is-10-fullhd">
        <div class="tabs">
          <ul>
            <li v-for="(chart, index) in availableCharts" @click="activeChart = chart[1]" :class="{'is-active': activeChart == chart[1]}" :key="index"><a>{{ chart[0] }}</a></li>
          </ul>
        </div>
        <component v-if="dataLoaded" :is="activeChart" :leagueData="leagueData" :height="600" :width="1000"></component>
        <!-- <elo-chart v-if="dataLoaded" :players="players" :elos="elos" :height="600" :width="1000" ></elo-chart> -->
      </div>
      <div class="column is-3-desktop is-2-fullhd">
        <game-feed :game-list="leagueData.gameHistory"></game-feed>
      </div>
    </div>
</template>

<script>
import eloChart from './charts/EloChart.vue'
import shutoutsChart from './charts/ShutoutsChart.vue'
import gameFeed from './GameFeed.vue'
import axios from '../axios-foos.js'
export default {
  data () {
    return {
      leagueData: {
        players: [],
        elos: [],
        gameHistory: []
      },
      dataLoaded: false,
      activeChart: 'elo-chart',
      availableCharts: [ // This is an array with pairs. The "name" of the chart and the component name
        ['Elo', 'elo-chart'],
        // ['Points', 'points-chart'],
        // ['King', 'king-chart'],
        ['Shutouts', 'shutouts-chart'],
        // ['Game Stats', 'game-stats-chart']
      ]
    }
  },
  props: {
    name: {required: true}
  },
  components: {
    eloChart,
    shutoutsChart,
    gameFeed
  },
  created() {
    axios.get(`/elos/${this.name}`)
      .then( res => {
          console.log('elos', res)
          this.leagueData.players = res.data.players
          this.leagueData.elos = res.data.elos
          this.$nextTick( () => {
            this.dataLoaded = true
          })
      })
      .catch(error => console.log(error))
    
    axios.get(`/gamehistory/${this.name}`)
      .then( res => {
          console.log('gamehistory', res)
          this.leagueData.gameHistory = res.data.games
          this.leagueData.gameHistory = this.leagueData.gameHistory.map( (game, index) => {
            game.gameNumber = index + 1
            return game
          })
          this.leagueData.gameHistory.reverse()
      })
      .catch(error => console.log(error))
  }
}
</script>

<style>

</style>
