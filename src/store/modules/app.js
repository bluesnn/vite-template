import { defineStore, acceptHMRUpdate } from 'pinia'

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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
}
