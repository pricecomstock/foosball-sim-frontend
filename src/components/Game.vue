<template>
  <div class="box">
    <p class="is-size-7">
      <strong>Game #{{ game.gameNumber }}</strong>
    </p>
    <nav class="level is-mobile">
      <div class="level-item">
        <div class="level-item has-text-centered score">
          <div>
            <p class="heading">{{ game.winner.player.name }} [+{{ game.eloChange.toFixed(1) }}]</p>
            <p class="title tag is-success is-large">{{ game.winner.score }}</p>
            <!-- <p>
              <span class="icon is-small">
                <i v-for="i in game.winner.score" class="fas fa-futbol pointicon" :key="i"></i>
              </span>
            </p> -->
          </div>
        </div>
      </div>
      <!-- <div class="level-item has-text-centered">
        <div>
          <p class="heading">Elo</p>
          <p class="subtitle">
            <span class="icon is-small">
              <i class="fa fa-angle-left"></i>
            </span>
            {{ game.eloChange.toFixed(1) }}
          </p>
        </div>
      </div> -->
      <div class="level-item">
        <div class="level-item has-text-centered score">
          <div>
            <p class="heading">{{ game.loser.player.name }} [-{{ game.eloChange.toFixed(1) }}]</p>
            <p class="title tag is-white is-large">{{ game.loser.score }}</p>
            <!-- <p>
              <span class="icon is-small">
                <i v-for="i in game.loser.score" class="fas fa-futbol pointicon" :key="i"></i>
              </span>
            </p> -->
          </div>
        </div>
      </div>
      <!-- <div class="level-right has-text-centered expand-arrow" @click="expanded = !expanded">
        <div class="level-item">
          <span class="icon">
            <i class="fas fa-lg fa-angle-down"></i>
          </span>
        </div>
      </div> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Game',
  props: {
      game: {
          required: true
      }
  },
  data () {
    return {
      expanded: false
    }
  }
}
</script>

<style>
.score {
  min-width: 5rem;
}

.pointicon {
  font-size: 0.6em;
  overflow-wrap: break-word;
}

.expand-arrow {
  cursor: pointer;
}
</style>
