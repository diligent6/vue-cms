import useLoginStore from '@/stores/login/login'
import { storeToRefs } from 'pinia'

export function usePermissons(permissionsId: string) {
  // 从login中获取permission信息
  const loginStore = useLoginStore()
  const permissions = loginStore.permissions

  //遍历permission看是否存在当前id 将结果变为布尔值
  return !!permissions.find((item: string) => item.includes(permissionsId))
}
