<template>
  <div class="side-bar">
    <div class="cell"
         v-for="item in cellList"
         :key="item.id"
         @click="onClick(item)">
      <div class="txt" v-html="item.name"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive} from 'vue'
  import {ItemInterface} from '@/model/items/Item.interface'

  export default defineComponent({
    name: 'SideBar',
    setup(props, {emit}) {
      const cellList: ItemInterface[] = reactive([
        {id: 1, name: 'Components<br/>A', componentName: 'CustomComponentsA', selected: false},
        {id: 2, name: 'Components<br/>B', componentName: 'CustomComponentsB', selected: false},
        {id: 3, name: 'Components<br/>C', componentName: 'CustomComponentsC', selected: false}
      ])
      const onClick = (item: ItemInterface) => {
        // console.log('onClick item', item)
        emit('item-click', item)
      }
      return {
        cellList,
        onClick
      }
    }
  })
</script>

<style scoped lang="scss">
  .side-bar {
    width: 100px;
    background-color: #42b983;

    .cell {
      width: 80px;
      height: 40px;
      background-color: #2c3e50;
      border-radius: 0%;
      margin: auto;
      text-align: center;
      color: white;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      & + .cell {
        margin-top: 10px;
      }

      .txt {
      }
    }
  }
</style>
