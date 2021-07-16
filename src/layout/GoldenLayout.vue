<template>
  <div class="golden-layout" ref="element">
    <teleport
      v-for="{ id, type, element ,bindData} in componentInstances"
      :key="id"
      :to="element">
      <component :is="type" :text="bindData"></component>
    </teleport>
  </div>
</template>

<script lang="ts">
  import {defineComponent, h, nextTick, onMounted, shallowRef} from 'vue'
  import {useGoldenLayout} from '../use-golden-layout'
  import 'golden-layout/dist/css/goldenlayout-base.css'
  import 'golden-layout/dist/css/themes/goldenlayout-dark-theme.css'
  import {LayoutConfig} from 'golden-layout'

  const SpanText = defineComponent({render: () => h('span', 'It works!')})
  const components = {
    SpanText
  }
  export default defineComponent({
    name: 'GoldenLayout',
    components,
    props: {
      layoutConfig: {
        type: Object,
        default: () => {
          return {
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
        }
      }
    },
    setup(props) {
      interface ComponentInstance {
        id: number
        type: string
        element: HTMLElement,
        bindData: any
      }

      let instanceId = 0
      const componentInstances = shallowRef<ComponentInstance[]>([])
      const createComponent = (type: string, element: HTMLElement) => {
        // if (!componentTypes.has(type)) {
        //   throw new Error(`Component not found: '${type}'`)
        // }
        ++instanceId
        componentInstances.value = componentInstances.value.concat({
          id: instanceId,
          type,
          element,
          bindData: `- ${type} - ${type} -`
        })
      }
      const destroyComponent = (toBeRemoved: HTMLElement) => {
        console.log('destroyComponent')
        componentInstances.value = componentInstances.value.filter(
          ({element}) => element !== toBeRemoved
        )
      }
      const config: LayoutConfig = props.layoutConfig as LayoutConfig
      const {element, layout} = useGoldenLayout(createComponent, destroyComponent, config)
      const handleWindowResizeEvent = () => {
        const $elementMain = element.value as HTMLElement
        const controlsWidth = $elementMain?.offsetWidth
        const height = $elementMain?.offsetHeight
        if (layout.value) {
          layout.value.setSize(controlsWidth, height)
        }
      }
      onMounted(() => {
        nextTick(() => {
          window.addEventListener('resize', handleWindowResizeEvent, {passive: true})
        })
      })
      return {
        element,
        componentInstances
      }
    }
  })
</script>

<style lang="scss" scoped>
  .golden-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
