// 自定义组件集合

import CustomComponentsA from '@/components/Custom/CustomComponentsA.vue'
import CustomComponentsB from '@/components/Custom/CustomComponentsB.vue'
import CustomComponentsC from '@/components/Custom/CustomComponentsC.vue'
import CustomComponentsD from '@/components/Custom/CustomComponentsD.vue'
import CustomComponentsE from '@/components/Custom/CustomComponentsE.vue'
import CustomComponentsF from '@/components/Custom/CustomComponentsF.vue'

export default {
  CustomComponentsA,
  CustomComponentsB,
  CustomComponentsC,
  CustomComponentsD,
  CustomComponentsE,
  CustomComponentsF
}

/**
 * 自定义组件命名接口
 */
export interface CustomInterface {
  [key: string]: any
}
