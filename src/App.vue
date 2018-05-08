<template>
  <div id="app">
    <div class="section">
      <lesson-list></lesson-list>
    </div>
  </div>
</template>

<script>
import lessonList from './LessonList.vue'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    lessonList
  }
}
</script>

<style lang="scss">
</style>
