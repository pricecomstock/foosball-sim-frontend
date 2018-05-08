<template>
    <div class="container">
        <div class="columns">
            <div class="column is-one-quarter">
                <div class="field">
                    <label class="label">Start Time</label>
                    <p class="control has-icons-left">
                        <input class="input" placeholder="HH:MM" v-model="startTime">
                        <span class="icon is-small is-left">
                        <i class="fas fa-clock"></i>
                        </span>
                    </p>
                </div>
            </div>
            <div class="column is-half">
                <lesson-item
                    v-for="(lesson, index) in lessons"
                    :key="lesson"
                    v-bind.sync="lesson"
                    @delete="removeLesson(index)"
                    @moveup="moveUp(index)"
                    @movedown="moveDown(index)"></lesson-item>
                <div class="buttons is-right">
                    <button class="button is-success is-outlined" @click="addItem()">New</button>
                </div>
            </div>
            <div class="column is-one-quarter">
                <div class="box">
                    <p v-for="(lesson, index) in lessonsWithTime" :key="index" v-if="lesson.name.trim() != '' || lesson.time.trim != ''">
                        {{lesson.timeStamp}} - {{lesson.name}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import lessonItem from './LessonItem.vue'
export default {
  name: 'lessonList',
  data () {
    return {
        lessons: [
            {
                name: '',
                time: ''
            }
        ],
        startTime: '12:00'
    }
  },
  components: {
      lessonItem
  },
  computed: {
      lessonsWithTime() {
          let time = moment(this.startTime, moment.HTML5_FMT.TIME)
          let lessonsWithTime = this.lessons.map((lesson) => {
              lesson.timeStamp = time.format('hh:mm')
              time.add(lesson.time, 'minutes')
              return lesson;
          })
          return lessonsWithTime
      }
  },
  methods: {
      addItem() {
          this.lessons.push({
              name: '',
              time: ''
          })
      },
      removeLesson(index) {
          this.lessons.splice(index, 1); // remove 1 item at index
      },
      moveUp(index) {
          console.log('up')
          if (index > 0) {
              this.lessons.splice(index - 1, 0, this.lessons.splice(index, 1)[0])
          }
      },
      moveDown(index) {
          console.log('down')
          if (index < this.lessons.length - 1) {
              this.lessons.splice(index + 1, 0, this.lessons.splice(index, 1)[0])
          }
      }
      
  }
}
</script>

<style lang="scss">

</style>
