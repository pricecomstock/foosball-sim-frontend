<template>
  <div>
  	<game v-for="(game, index) in gameList" :game="game" :key="index"></game>
  </div>
</template>

<script>
import game from './Game'
export default {
  name: 'gamefeed',
  components: {
    game
  },
  props: {
    gameList: {
      required: true
    }
  }
}
</script>

<style>

</style>
