import { defineStore } from 'pinia'
import { store } from '@/store'
import { userApi } from '@/api'
import { useAppStoreWithOut } from '@/store/modules/app'

const appStore = useAppStoreWithOut()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: '',
    count: appStore.count
  }),

  getters: {},

  actions: {
    login() {
      userApi().then(res => {
        this.user = res
      })
      // 登录api及其逻辑处理
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
