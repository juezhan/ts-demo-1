<template>
  <div>
    <h1>CustomComponentsA</h1>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'CustomComponentsA'
  })
</script>

<style scoped lang="scss">
  h1 {
    color: red;
  }
</style>
