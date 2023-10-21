import {
  createNewSystem,
  createNewUser,
  deleteSystemById,
  deleteUserById,
  getUsersList,
  postSystemList,
  updateSystem,
  updateUser
} from '@/services/main/system/system'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: () => ({
    userList: [],
    totalCount: '',
    systemList: [],
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
    },
    //获取用户列表
    async fetchSystemListAction(queryInfo: any = { offset: 0, size: 10 }, pageName: string) {
      const systemListResult = await postSystemList(queryInfo, pageName)

      this.systemList = systemListResult.data.list
      this.totalCount = systemListResult.data.totalCount
    },
    //根据id删除当前用户
    async deleteSystemByIdAction(id: string, pageName: string) {
      //调用删除的网络请求方法进行删除操作
      const result = await deleteSystemById(id, pageName)

      //调用获取请求列表的action 刷新页面
      this.fetchSystemListAction({ offset: this.offset, size: this.size }, pageName)
    },
    //创建新用户
    async createSystemAction(SystemData: any = null, pageName: string) {
      if (SystemData) {
        const res = await createNewSystem(SystemData, pageName)
        //调用获取请求列表的action 刷新页面
        this.fetchSystemListAction({ offset: this.offset, size: this.size }, pageName)
      }
    },
    //修改用户
    async updateSystemAction(SystemId: string, SystemData: any, pageName: string) {
      const res = await updateSystem(SystemId, SystemData, pageName)

      //调用获取请求列表的action 刷新页面
      this.fetchSystemListAction({ offset: this.offset, size: this.size }, pageName)
    }
  }
})

export default useSystemStore
