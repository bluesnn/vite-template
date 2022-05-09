import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore('app', {
  state: () => ({
    count: 0
  }),

  getters: {
    double: (state) => state.count * 2
  },

  actions: {
    increment() {
      this.count++
    }

  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
