<template>
  <div>
    <h3>Items:</h3>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
      <item-component v-for="item in items"
                      :key="item.id"
                      :model="item"
                      @select="onItemSelect"></item-component>
    </ul>
  </div>
</template>

<script lang="ts">
  import {defineComponent, PropType} from 'vue'
  import ItemComponent from './children/Item.component.vue'
  import {ItemInterface} from '../../model/items/Item.interface'

  export default defineComponent({
    name: 'ItemsList.component',
    components: {
      ItemComponent
    },
    props: {
      items: {
        type: Array as PropType<ItemInterface[]>
      }
    },
    setup() {
      const onItemSelect = (item: ItemInterface) => {
        item.selected = !item.selected
        console.log('onItemSelect', item.id, item.selected)
      }
      return {
        onItemSelect
      }
    }
  })
</script>
