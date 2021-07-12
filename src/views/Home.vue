<template>
  <div class="home">
    <item-list-component :items="items"></item-list-component>
    <div class="main" ref="main"></div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, reactive, onMounted, shallowRef, nextTick} from 'vue'
  import ItemListComponent from '@/components/items/ItemsList.component.vue'
  import {ItemInterface} from '@/model/items/Item.interface'
  import {GoldenLayout, LayoutConfig} from 'golden-layout'
  import HelloWorld from '@/components/HelloWorld.vue'

  const components = {ItemListComponent, HelloWorld}
  export default defineComponent({
    name: 'Home',
    components,
    setup() {
      const eMain = shallowRef<HTMLElement | null>(null)
      const items: ItemInterface[] = reactive([
        {id: 1, name: 'Item 1', componentName: 'Item 1', selected: false},
        {id: 2, name: 'Item 2', componentName: 'Item 2', selected: false},
        {id: 3, name: 'Item 3', componentName: 'Item 3', selected: false}
      ])
      onMounted(() => {
        nextTick(() => {
          document.querySelector('#myMain')
          if (eMain.value != null) {
            const goldenLayout = new GoldenLayout(eMain.value)
            console.log(eMain.value)
            console.log(goldenLayout)
            const config: LayoutConfig = {
              root: {
                type: 'column',
                content: [
                  {
                    type: 'component',
                    title: 'HelloWorld',
                    componentType: 'HelloWorld'
                  },
                  {
                    type: 'component',
                    title: 'HelloWorld',
                    componentType: 'HelloWorld'
                  }]
              }
            }
            goldenLayout.getComponentEvent = (container, itemConfig) => {
              console.log(container)
              console.log(itemConfig)
            }
            goldenLayout.loadLayout(config)
          }
        })
      })
      return {
        main: eMain,
        items
      }
    }
  })
</script>
<style lang="scss">
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
