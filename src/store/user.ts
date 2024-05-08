import { defineStore } from 'pinia'

export const userStore = defineStore( {
  id: 'user',
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      role: localStorage.getItem('role') || '3',
      userInfo: {}
    }
  },

  actions: {
    setRole(type: string) {
      this.role = type
    },
    setUserInfo(data: any) {
      this.userInfo = data.userInfo
      this.token = data.token
      this.role = data.user_info.role || '1'
      localStorage.setItem('token', this.token)
      localStorage.setItem('role', this.role)
    },
    // 退出登录
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    }
  }

})