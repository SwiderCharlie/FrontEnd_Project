<template>
  <div class="mainright">
    <Recommend v-if="area === undefined && type === undefined"/>
    <Other :title="title" v-else/>
  </div>
</template>

<script>
import Recommend from './Recommend'
import Other from './Other'

export default {
  name: 'MainRight',
  components: { Recommend, Other },
  data() {
    return {
      title: ''
    }
  }, 

  computed: {
    area() {
      return this.$route.query.area
    },

    type() {
      return this.$route.query.type
    }
  },

  mounted() {
    this.$bus.$on('getTitle', (title) => {
      this.title = title
    })
  }
}
</script>
