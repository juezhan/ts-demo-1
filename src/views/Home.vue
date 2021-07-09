<template>
  <div class="home">
    <item-list-component :items="items"></item-list-component>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive} from 'vue'
  import ItemListComponent from '@/components/items/ItemsList.component.vue'
  import {ItemInterface} from '@/model/items/Item.interface'

  export default defineComponent({
    name: 'Home',
    components: {
      ItemListComponent
    },
    setup() {
      const items: ItemInterface[] = reactive([
        {id: 1, name: 'Item 1', selected: false},
        {id: 2, name: 'Item 2', selected: false},
        {id: 3, name: 'Item 3', selected: false}
      ])
      return {
        items
      }
    }
  })
</script>
