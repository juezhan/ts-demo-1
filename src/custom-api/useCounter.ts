import {ref, computed, onMounted} from 'vue'

export default function (props: any, context: any): any {
  const count = ref(0)
  const articles = ref([])
  const double = computed(() => count.value * 2)

  const increment = () => {
    count.value++
  }
  onMounted(() => {
    console.log('onMounted props:', props)
    console.log('onMounted context:', context)
  })
  return {
    count,
    double,
    increment
  }
}
