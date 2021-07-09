<template>
  <div class="side-bar">
    <div class="cell"
         v-for="item in cellList"
         :key="item.id"
         @click="onClick(item)">{{item.name}}
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
        {id: 1, name: '1', selected: false},
        {id: 2, name: '2', selected: false},
        {id: 3, name: '3', selected: false}
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
    width: 60px;
    background-color: #42b983;

    .cell {
      width: 40px;
      height: 40px;
      background-color: #2c3e50;
      border-radius: 50%;
      margin: auto;
      text-align: center;
      line-height: 40px;
      color: white;

      & + .cell {
        margin-top: 10px;
      }
    }
  }
</style>
