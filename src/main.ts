import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Custom, {CustomInterface} from '@/components/Custom'

const app = createApp(App)
app.use(store)
app.use(router)
for (const key in Custom) {
  const keyStr = key.toString()
  app.component(keyStr, (<CustomInterface>Custom)[keyStr])
}
app.mount('#app')
