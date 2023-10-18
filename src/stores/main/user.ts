import { getUsersList } from '@/services/main/user'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    userList: []
  }),
  actions: {
    async fetchUserListAction(offset: number = 0, size: number = 10) {
      const userListResult = await getUsersList(offset, size)
      this.userList = userListResult.data.list
    }
  }
})

export default useUserStore
