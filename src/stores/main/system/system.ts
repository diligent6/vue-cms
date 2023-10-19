import {
  createNewUser,
  deleteUserById,
  getUsersList,
  updateUser
} from '@/services/main/system/system'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    userList: [],
    totalCount: '',
    offset: 0,
    size: 10
  }),
  actions: {
    //获取用户列表
    async fetchUserListAction(queryInfo: any = { offset: 0, size: 10 }) {
      const userListResult = await getUsersList(queryInfo)

      this.userList = userListResult.data.list
      this.totalCount = userListResult.data.totalCount
    },
    //根据id删除当前用户
    async deleteUserByIdAction(id: string) {
      //调用删除的网络请求方法进行删除操作
      const result = await deleteUserById(id)

      //调用获取请求列表的action 刷新页面
      this.fetchUserListAction({ offset: this.offset, size: this.size })
    },
    //创建新用户
    async createUserAction(userData: any = null) {
      if (userData) {
        const res = await createNewUser(userData)
        this.fetchUserListAction({ offset: this.offset, size: this.size })
      }
    },
    //修改用户
    async updateUserAction(userId: string, userData: any) {
      const res = await updateUser(userId, userData)

      //调用获取请求列表的action 刷新页面
      this.fetchUserListAction({ offset: this.offset, size: this.size })
    }
  }
})

export default useUserStore
