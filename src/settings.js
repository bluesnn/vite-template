import router from './router'
import { useUserStoreWithOut } from '@/store/modules/user'

const userStore = useUserStoreWithOut()

router.beforeEach(async(to, from, next) => {
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
