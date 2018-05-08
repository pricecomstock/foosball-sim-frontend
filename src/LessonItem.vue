<template>
  <div class="box">
    <div class="field is-grouped">
      <p class="control timeinput has-icons-left">
        <input @input="updateTime($event.target.value)" class="input" type="number" placeholder="mm">
        <span class="icon is-small is-left">
          <i class="fas fa-clock"></i>
        </span>
      </p>
      <p class="control is-expanded has-icons-left">
        <input @input="updateName($event.target.value)" class="input" type="text" placeholder="name">
        <span class="icon is-small is-left">
          <i class="fas fa-lightbulb"></i>
        </span>
      </p>
      <button class="delete" @click="$emit('delete')"></button>
      <span class="icon" @click="$emit('moveup')">
        <i class="fas fa-arrow-alt-circle-up"></i>
      </span>
      <span class="icon" @click="$emit('movedown')">
        <i class="fas fa-arrow-alt-circle-down"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lessonItem',
  data () {
    return {
    }
  },
  props: {
      name: {
          type: String,
          required: false
      },
      time: {
          type: String,
          required: false
      }
  },
  methods: {
    updateTime(newTime) {
      this.$emit('update:time', newTime)
    },
    updateName(newName) {
      this.$emit('update:name', newName)
    }
  }
}
</script>

<style lang="scss">
.timeinput {
  width:90px;
}
</style>
