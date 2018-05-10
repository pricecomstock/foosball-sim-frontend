<template>
  <div class="columns is-centered">
      <div class="column is-6">
          <router-link class="box" v-for="(league, index) in leagues" :key="index" :to="'/league/' + league.name">
              <div class="level">
                  <div class="level-left">
                      <div class="level-item">
                          {{ league.name }}
                      </div>
                  </div>
                  <div class="level-right">
                      <div class="level-item">
                          <span class="icon">
                            <i class="fas fa-user"></i>
                          </span>
                          {{ league.players }}
                      </div>
                      <div class="level-item">
                          <span class="icon">
                            <i class="fas fa-futbol"></i>
                          </span>
                          {{ league.games }}
                      </div>
                  </div>
              </div>
          </router-link>
      </div>
  </div>
</template>

<script>
import axios from '../axios-foos.js'
export default {
    data() {
        return {
            leagues: []
        }
    },
    created() {
        axios.get('/listleagues')
        .then( res => {
            console.log(res)
            this.leagues = res.data.leagues
        })
        .catch(error => console.log(error))
    }
}
</script>

<style>

</style>
