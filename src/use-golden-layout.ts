import {GoldenLayout, LayoutConfig, EventEmitter, Stack, DragSource} from 'golden-layout'
import {onMounted, ref, shallowRef} from 'vue'

export const isClient = typeof window !== 'undefined'
export const isDocumentReady = () => isClient && document.readyState === 'complete' && document.body != null

export function useDocumentReady(func: () => void) {
  onMounted(() => {
    // console.log(isDocumentReady())
    if (isDocumentReady()) func()
    else {
      document.addEventListener('readystatechange', () => isDocumentReady() && func(), {
        passive: true
      })
    }
  })
}

export function useGoldenLayout(
  createComponent: (type: string, container: HTMLElement) => void,
  destroyComponent: (container: HTMLElement) => void,
  config?: LayoutConfig
) {
  const element = shallowRef<HTMLElement | null>(null)
  const layout = shallowRef<GoldenLayout | null>(null)
  const dragSource = shallowRef<DragSource | null>(null)
  const initialized = ref(false)
  const handleStackHeaderClick = (event: EventEmitter.ClickBubblingEvent) => {
    // const stack = event.target as Stack
    // const itemCount = stack.contentItems.length
    // console.log(event)
    // console.log(itemCount)
  }
  useDocumentReady(() => {
    if (element.value == null) throw new Error('Element must be set.')
    const goldenLayout = new GoldenLayout(element.value)

    goldenLayout.getComponentEvent = (container, itemConfig) => {
      const {componentType} = itemConfig
      // console.log('componentType', componentType)
      // console.log('container', container)
      if (typeof componentType !== 'string') throw new Error('Invalid component type.')
      createComponent(componentType, container.element)
    }
    goldenLayout.releaseComponentEvent = container => {
      destroyComponent(container.element)
    }

    goldenLayout.addEventListener('stackHeaderClick', (event) => handleStackHeaderClick(event))

    if (config != null) goldenLayout.loadLayout(config)

    layout.value = goldenLayout as any
    dragSource.value = DragSource
    initialized.value = true
  })

  return {element, initialized, layout, dragSource}
}
