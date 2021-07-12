<template>
  <div class="about foundation-layout row">
    <top-bar></top-bar>
    <div class="foundation-layout col">
      <side-bar @item-click="handleClickSideBar"></side-bar>
      <div class="foundation-layout work-space">
        <div class="main" ref="elementMain" style="">
          <teleport
            v-for="{ id, type, element } in componentInstances"
            :key="id"
            :to="element">
            <component :is="type"></component>
          </teleport>
        </div>
      </div>
    </div>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script lang="ts">
  import {useGoldenLayout} from '../use-golden-layout'
  import {defineComponent, h, shallowRef, Ref} from 'vue'
  import 'golden-layout/dist/css/goldenlayout-base.css'
  import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css'
  import HelloWorld from '@/components/HelloWorld.vue'
  import CustomComponentsA from '@/components/CustomComponentsA.vue'
  import CustomComponentsB from '@/components/CustomComponentsB.vue'
  import CustomComponentsC from '@/components/CustomComponentsC.vue'
  import {TopBar, BottomBar, SideBar} from '@/layout/bars'
  import {ItemInterface} from '@/model/items/Item.interface'
  import {LayoutConfig} from 'golden-layout'

  const SpanText = defineComponent({render: () => h('span', 'It works!')})

  const components = {
    CustomComponentsA,
    CustomComponentsB,
    CustomComponentsC,
    TopBar,
    BottomBar,
    SideBar,
    HelloWorld,
    SpanText
  }

  // const methods = (layout?: any) => {
  //   return {
  //     handleClickSideBar(item?: ItemInterface) {
  //       console.log('layout', layout.value.root.contentItems[0].addChild)
  //       console.log('handleClickSideBar item', item)
  //       const newItemConfig = {
  //         type: 'component',
  //         title: 'newItemConfig',
  //         componentType: 'SpanText'
  //       }
  //       layout.value.root.contentItems[0].addChild(SpanText)
  //     }
  //   }
  // }
  export default defineComponent({
    components,
    setup() {
      interface ComponentInstance {
        id: number
        type: string
        element: HTMLElement
      }

      let instanceId = 0
      const componentTypes = new Set(Object.keys(components))
      const componentInstances = shallowRef<ComponentInstance[]>([])

      const createComponent = (type: string, element: HTMLElement) => {
        if (!componentTypes.has(type)) {
          throw new Error(`Component not found: '${type}'`)
        }
        ++instanceId
        componentInstances.value = componentInstances.value.concat({
          id: instanceId,
          type,
          element
        })
      }
      const destroyComponent = (toBeRemoved: HTMLElement) => {
        componentInstances.value = componentInstances.value.filter(
          ({element}) => element !== toBeRemoved
        )
      }
      const config: LayoutConfig = {
        root: {
          type: 'column',
          content: [
            {
              type: 'component',
              title: 'HelloWorld',
              componentType: 'HelloWorld',
              reorderEnabled: true
            },
            {
              type: 'row',
              content: [
                {
                  type: 'component',
                  title: 'SpanTextA',
                  componentType: 'SpanText'
                },

                {
                  type: 'component',
                  title: 'SpanTextC',
                  componentType: 'SpanText'
                }
              ]
            }
          ]
        }
      }
      const {element, layout} = useGoldenLayout(createComponent, destroyComponent, config)
      // console.log('layout', layout)
      const handleClickSideBar = (item?: ItemInterface) => {
        // console.log('item', item)
        // console.log('layout.value', layout.value?.rootItem?.contentItems[1].addChild(''))
        if (layout.value && item && item.componentName) {
          if (layout.value.rootItem) {
            layout.value.addComponentAtLocation(item.componentName, {}, item.componentName, [{typeId: 7}])
            // if (item.componentName === 'CustomComponentsA') {
            //   layout.value.addComponentAtLocation('CustomComponentsA', {}, 'CustomComponentsA', [{typeId: 7}])
            // }
            // if (item.componentName === 'CustomComponentsB') {
            //   layout.value.addComponentAtLocation('CustomComponentsB', {}, 'CustomComponentsB', [{typeId: 7}])
            // }
            // if (item.componentName === 'CustomComponentsC') {
            //   layout.value.addComponentAtLocation('CustomComponentsC', {}, 'CustomComponentsC', [{typeId: 7}])
            // }
            // layout.value.addComponent('HelloWorld', {}, 'New Tab B')
          }
        }
      }
      return {
        elementMain: element,
        layout,
        componentInstances,
        handleClickSideBar
        // ...methods(layout)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .about {
    height: 100%;
  }

  .foundation-layout {
    display: flex;
    flex: 1;

    &.row {
      flex-direction: column;
    }

    &.col {
      flex-direction: row;
    }

    .work-space {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: auto;

      .main {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
