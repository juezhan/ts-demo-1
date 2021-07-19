<template>
  <div class="bottom-bar">
    <k-button>Default</k-button>
    <drop-down-list
      :data-items="categories"
      :default-item="'Select sport ...'"></drop-down-list>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import {Button} from '@progress/kendo-vue-buttons'
  import {DropDownList} from '@progress/kendo-vue-dropdowns'

  export default defineComponent({
    name: 'BottomBar',
    components: {
      DropDownList,
      'k-button': Button
    },
    setup() {
      return {
        categories: ['Basketball', 'Football', 'Tennis', 'Volleyball']
      }
    }
  })
</script>

<style scoped lang="scss">
  .bottom-bar {
    height: 40px;
    background-color: #42b983;
  }
</style>
