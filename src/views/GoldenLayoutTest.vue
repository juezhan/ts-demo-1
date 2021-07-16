<template>
  <div class="golden-layout-test">
    <div class="top">
      <button @click="increment">Add Component A</button>
      <div>
        count：{{count}}|double：{{double}}
      </div>
    </div>
    <div class="layout-main">
      <golden-layout :layout-config="layoutConfig"></golden-layout>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue'
  import GoldenLayout from '../layout/GoldenLayout.vue'
  import useCounter from '@/custom-api/useCounter'

  export default defineComponent({
    name: 'GoldenLayoutTest',
    components: {
      GoldenLayout
    },
    setup(props, context) {
      const {count, double, increment} = useCounter(props, context)
      return {
        count,
        double,
        increment,
        layoutConfig: {
          root: {
            type: 'row',
            content: [
              {
                type: 'column',
                content: [
                  {
                    type: 'column',
                    content: [
                      {
                        type: 'stack',
                        content: [
                          {
                            type: 'component',
                            componentName: 'CustomComponentsA',
                            componentType: 'CustomComponentsA'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'stack',
                    content: [
                      {
                        type: 'component',
                        componentName: 'CustomComponentsB',
                        componentType: 'CustomComponentsB'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'column',
                content: [
                  {
                    type: 'column',
                    content: [
                      {
                        type: 'stack',
                        content: [
                          {
                            type: 'component',
                            componentName: 'CustomComponentsA',
                            componentType: 'CustomComponentsA'
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'stack',
                    content: [
                      {
                        type: 'component',
                        componentName: 'CustomComponentsB',
                        componentType: 'CustomComponentsB'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    }
  })
</script>

<style scoped lang="scss">
  .golden-layout-test {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
      height: 80px;
    }

    .layout-main {
      flex: 1;
    }
  }
</style>
