<template>
  <div>
    <h1>CustomComponentsD</h1>
    <button @click="handleClickButton">Click Me</button>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'CustomComponentsD',
    setup() {
      const handleClickButton = () => {
        alert('Click Me')
      }
      return {
        handleClickButton
      }
    }
  })
</script>

<style scoped lang="scss">
  h1 {
    color: yellow;
  }
</style>
