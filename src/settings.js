import router from './router'
import { useUserStore } from '@/store/modules/user'

router.beforeEach(async(to, from, next) => {
  const userStore = useUserStore()
  console.log('userStore: ', userStore)

  window.document.title = to.meta.title || ''
  console.log('userStore中的count', userStore.count)

  try {
    await userStore.login()
    console.log('settings获取storeUser', userStore.user)
  } catch (error) {
    console.log('接口请求失败')
  }
  next()
})
