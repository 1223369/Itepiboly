import { userInfo } from '@/api/my'
import { defineStore } from 'pinia'

export const myStore = defineStore( {
  id: 'my',
  state: () => {
    return {
      userInfo: {}
    }
  },

  actions: {
    async getUserInfo() {
      const res = await userInfo()
      if (res) {
        this.userInfo = res
      }
    }
  }

})