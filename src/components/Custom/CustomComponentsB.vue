<template>
  <div>
    <h1>{{sText}}</h1>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'CustomComponentsB',
    props: {
      text: {
        type: String,
        default: 'CustomComponentsA'
      }
    },
    setup(props) {
      const sText = props.text || ''
      return {
        sText
      }
    }
  })
</script>

<style scoped lang="scss">
  h1 {
    color: green;
  }
</style>
