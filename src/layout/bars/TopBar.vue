<template>
  <div class="top-bar">
    <button @click="handleClick">Save Layout</button>
    <button @click="handleClickReloadSavedLayout">Reload saved Layout</button>
    <button @click="handleClickLoadComponentAsRoot">Load Component as Root</button>
    <button @click="handleClickReplaceComponent" >Replace Color Component with</button>
    <button @click="handleClickAddComponentByDrag" >Add New Drag Component</button>
    <button @click="handleClickClearLayout" >Clear Layout</button>
    <button id="btn1">Add Component Drag Source</button>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'TopBar',
    setup(props, {emit}) {
      const handleClick = () => {
        emit('button-click')
      }
      const handleClickReloadSavedLayout = () => {
        emit('click-reload-saved-layout')
      }
      const handleClickLoadComponentAsRoot = () => {
        emit('click-load-component-as-root')
      }
      const handleClickReplaceComponent = () => {
        emit('click-replace-component')
      }
      const handleClickAddComponentByDrag = () => {
        emit('click-add-component-drag')
      }
      const handleClickClearLayout = () => {
        emit('click-clear-layout')
      }
      return {
        handleClick,
        handleClickReloadSavedLayout,
        handleClickLoadComponentAsRoot,
        handleClickReplaceComponent,
        handleClickAddComponentByDrag,
        handleClickClearLayout
      }
    }
  })
</script>

<style scoped lang="scss">
  .top-bar {
    height: 60px;
    background-color: #42b983;
  }
</style>
