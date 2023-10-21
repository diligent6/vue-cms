import type { ISearchConfig } from '@/types/components/page-search'

const searchConfig: ISearchConfig = {
  pageName: 'menuPage',
  formItems: [
    {
      type: 'input',
      prop: 'id',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      type: 'input',
      prop: 'menuname',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    }
  ]
}

export default searchConfig
