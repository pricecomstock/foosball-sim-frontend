<template>
  <div class="box">
    <nav class="level is-mobile">
      <div class="level-left">
        <div class="level-item has-text-centered score">
          <div>
            <p class="heading">{{ game.winner.player }}</p>
            <p class="title">{{ game.winner.score }}</p>
            <p>
              <span class="icon is-small">
                <i v-for="i in game.winner.score" class="fas fa-futbol pointicon" :key="i"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Elo</p>
          <p class="subtitle">{{ game.eloChange.toFixed(1) }}</p>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item has-text-centered score">
          <div>
            <p class="heading">{{ game.loser.player }}</p>
            <p class="title">{{ game.loser.score }}</p>
            <p>
              <span class="icon is-small">
                <i v-for="i in game.loser.score" class="fas fa-futbol pointicon" :key="i"></i>
              </span>
            </p>
          </div>
        </div>
      </div>
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
  }
}
</script>

<style>
.score {
  min-width: 3rem;
}

.pointicon {
  font-size: 0.6em;
  overflow-wrap: break-word;
}
</style>
