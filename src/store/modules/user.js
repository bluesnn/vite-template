import { defineStore, acceptHMRUpdate } from 'pinia'
import { userApi } from '@/api'
import { useAppStore } from '@/store/modules/app'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: '',
    count: useAppStore().count
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
