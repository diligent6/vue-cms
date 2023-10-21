import type { ISearchConfig } from '@/types/components/page-search'

const searchConfig: ISearchConfig = {
  pageName: 'rolePage',
  formItems: [
    {
      type: 'input',
      prop: 'id',
      label: '角色名称',
      placeholder: '请输入查询的角色名称',
      initialValue: 'abc'
    },
    {
      type: 'input',
      prop: 'rolename',
      label: '角色名称',
      placeholder: '请输入查询的角色名称',
      initialValue: 'abc'
    },
    {
      type: 'input',
      prop: 'id',
      label: '权限介绍',
      placeholder: '请输入查询的权限介绍',
      initialValue: 'abc'
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    }
  ]
}

export default searchConfig
