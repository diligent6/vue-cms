import { accountLoginRequest } from '@/services/login/login'
import type { IAccount } from '@/types/login'
import { localCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import { TOKEN } from '../../global/const'
import router from '@/router'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: '',
    id: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      const res = await accountLoginRequest(account)

      //获取id 和 token
      const id = res.dat?.id
      const token = res.data?.token
      this.id = id
      this.token = token
      //本地化存储
      localCache.setCache(TOKEN, token)

      //进行页面跳转
      router.push('/main')
    }
  }
})

export default useLoginStore
