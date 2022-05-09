import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '',
    name: 'Demo',
    component: () => import('@/views/demo/index.vue'), // 必须使用懒加载方式
    meta: {
      title: '首页',
      keepAlive: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
