<template>
  <div class="about foundation-layout row">
    <top-bar @button-click="handleClickSaveLayout"
             @click-reload-saved-layout="handleClickReloadSavedLayout"
             @click-load-component-as-root="handleClickLoadComponentAsRoot"
             @click-replace-component="handleClickReplaceComponent"
             @click-add-component-drag="handleClickAddComponentByDrag"></top-bar>
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
  import {defineComponent, h, shallowRef, onMounted, nextTick} from 'vue'
  import 'golden-layout/dist/css/goldenlayout-base.css'
  import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css'
  import HelloWorld from '@/components/HelloWorld.vue'
  import CustomComponentsA from '@/components/Custom/CustomComponentsA.vue'
  import CustomComponentsB from '@/components/Custom/CustomComponentsB.vue'
  import CustomComponentsC from '@/components/Custom/CustomComponentsC.vue'
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
      let _savedLayout: any = null

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
        settings: {},
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
      const {element, layout, dragSource} = useGoldenLayout(createComponent, destroyComponent, config)
      // console.log('layout', layout)
      const handleClickSideBar = (item?: ItemInterface) => {
        if (layout.value && item && item.componentName) {
          if (layout.value.rootItem) {
            layout.value.addComponentAtLocation(item.componentName, {}, item.componentName, [{typeId: 1}])
          }
        }
      }
      const handleClickSaveLayout = () => {
        _savedLayout = layout.value?.saveLayout()
        // console.log(layout.value?.saveLayout())
      }
      const handleClickReloadSavedLayout = () => {
        const layoutConfig = LayoutConfig.fromResolved(_savedLayout)
        if (layout.value) {
          layout.value.loadLayout(layoutConfig)
        }
      }
      const handleClickLoadComponentAsRoot = () => {
        const itemConfig: any = {
          type: 'component',
          componentType: 'CustomComponentsA',
          componentState: 'yellow'
        }
        if (layout.value) {
          layout.value.loadComponentAsRoot(itemConfig)
        }
      }
      // const replaceComponentRecursively = (content: any[], itemConfig: any) => {
      //   console.log('content', content)
      //   console.log('itemConfig', itemConfig)
      //   for (const item of content) {
      //     if (item !== null) {
      //       console.log('item', item)
      //       // const container = item.container
      //       // container.replaceComponent(itemConfig)
      //     } else {
      //       // replaceComponentRecursively(item.contentItems, itemConfig)
      //     }
      //   }
      // }
      const handleClickReplaceComponent = () => {
        // const itemConfig: any = {
        //   type: 'component',
        //   componentType: 'CustomComponentsA'
        // }
        const ta = layout.value
        console.log('layout', ta)
        // if (layout.value) {
        //   const rootItem = layout.value.rootItem
        //   const content = [rootItem]
        //   replaceComponentRecursively(content, itemConfig)
        // }
      }
      const handleWindowResizeEvent = () => {
        const $elementMain = element.value as HTMLElement
        const controlsWidth = $elementMain?.offsetWidth
        const height = document.body.offsetHeight
        if (layout.value) {
          layout.value.setSize(controlsWidth, height)
        }
      }
      let _bubbleClickCount = 0
      let _captureClickCount = 0
      const _globalBubbleClickListener = () => {
        _bubbleClickCount++
        console.log('_bubbleClickCount', _bubbleClickCount)
      }
      const _globalCaptureClickListener = () => {
        _captureClickCount++
        console.log('_captureClickCount', _captureClickCount)
      }
      onMounted(() => {
        nextTick(() => {
          const $elementMain = element.value as HTMLElement
          window.addEventListener('resize', handleWindowResizeEvent, {passive: true})
          $elementMain.addEventListener('click', _globalBubbleClickListener, {passive: true})
          $elementMain.addEventListener('click', _globalCaptureClickListener, {capture: true, passive: true})
          const addComponentByDragButton = document.querySelector('#btn1') as HTMLButtonElement
          if (layout.value) {
            // 绑定拖动添加新组建的按钮
            const addComponentDragSource = layout.value.newDragSource(addComponentByDragButton, 'CustomComponentsC')
            console.log('addComponentDragSource', addComponentDragSource)
            // layout.value.addComponent(addComponentDragSource)
          }
        })
      })
      const handleClickAddComponentByDrag = () => {
        console.log('handleClickAddComponentByDrag')
        // if (dragSource.value) {
        //   new dragSource.value()
        //   console.log('dragSource', dragSource.value)
        // }
      }
      // const handleClickAddComponentByDrag = () => {
      //   if (layout.value) {
      //     const addComponentDragSource = layout.value.newDragSource(addComponentByDragButton, {type: 'CustomComponentsC'})
      //   }
      // }
      return {
        elementMain: element,
        layout,
        componentInstances,
        handleClickSideBar,
        handleClickSaveLayout,
        handleClickReloadSavedLayout,
        handleClickLoadComponentAsRoot,
        handleClickReplaceComponent,
        handleClickAddComponentByDrag
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
