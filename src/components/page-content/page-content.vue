<template>
  <div class="page-content">
    <!-- 顶部标题部分 -->
    <div class="header">
      <h2 class="title">{{ contentConfig?.header?.title }}</h2>
      <div class="operation">
        <el-button type="primary" @click="handleAddBtnClick" v-if="isCreate">新增数据</el-button>
        <el-button type="danger" @click="handleDeleteUsers">删除数据</el-button>
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table :data="systemList" style="width: 100%" border fit @select="handleSelect">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope"> {{ formatDate(scope.row.createAt) }} </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'status'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.enable"
                  :active-value="1"
                  :inactive-value="0"
                  :loading="isLoading"
                  style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                  @click="handleStatusChange(scope.row)"
                />
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button size="small" @click="editBtnClik(scope.row)" v-if="isUpdate">
                  <el-icon><Edit /></el-icon>
                </el-button>
                <el-popconfirm
                  title="你确定删除吗?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="handleDeleteClick(scope.row.id)"
                  v-if="isDelete"
                >
                  <template #reference>
                    <el-button size="small" type="danger">
                      <el-icon><delete /></el-icon
                    ></el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope" :prop="item.prop" hName="why"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <!-- 底部分页部分 -->
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        layout="slot, prev, pager, next"
        :total="parseInt(totalCount)"
        @current-change="handleCurrentChange"
      >
        <span
          >共{{ totalCount }}条
          <el-select v-model="pageSize" placeholder="Select" @change="handleSizeChange">
            <el-option
              v-for="item in pageSizes"
              :key="item"
              :label="item + '条/页'"
              :value="item"
            /> </el-select
        ></span>
      </el-pagination>
      <!-- @size`-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatDate } from '@/utils/format_date'
import { usePermissons } from '@/hooks/usePermissons'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}

//定义接受的属性
const props = defineProps<IProps>()
console.log(props)
//0.用户权限控制的相关逻辑
const isCreate = ref(usePermissons('system:users:create'))
const isDelete = ref(usePermissons('system:users:delete'))
const isUpdate = ref(usePermissons('system:users:update'))

// 1.获取当前页面的相关数据
//从store中获取表格数
const systemStore = useSystemStore()
const pageSize = ref(10)
const currentPage = ref(1)
//保存当前页 和 页面数量
systemStore.size = computed(() => {
  return pageSize.value
}) as any
systemStore.offset = computed(() => {
  return (currentPage.value - 1) * pageSize.value
}) as any
fetchSystemList()
const { systemList, totalCount } = storeToRefs(systemStore)
console.log(systemList.value)
//2.表格相关的逻辑
// 处理状态切换的逻辑
const isLoading = ref(false)
const handleStatusChange = (userData: any) => {
  isLoading.value = true

  setTimeout(() => {
    isLoading.value = false
    ElNotification({
      message: '更新成功',
      type: 'success',
      showClose: true
    })
  }, 300)
  systemStore.updateSystemAction(
    userData.id,
    { enable: userData.enable },
    props.contentConfig.pageName
  )
}
//分页相关功能
const pageSizes = ref([10, 20, 30, 40])
const handleCurrentChange = () => {
  fetchUserList()
}
const handleSizeChange = () => {
  fetchUserList()
}

//刪除用戶操作
const handleDeleteClick = (userId: string) => {
  systemStore.deleteSystemByIdAction(userId, props.contentConfig.pageName)
}
//批量删除操纵
let selectedUsers: any[] = []
const handleSelect = (rows: any) => {
  selectedUsers = rows
}
const handleDeleteUsers = () => {
  if (!selectedUsers.length) return

  selectedUsers.forEach((item) => {
    systemStore.deleteSystemByIdAction(item.id, props.contentConfig.pageName)
  })
}

const emits = defineEmits(['createBtnClick', 'editBtnClik'])
//新建按钮点击
const handleAddBtnClick = () => {
  emits('createBtnClick')
}
//编辑按钮点击
const editBtnClik = (systemData: any) => {
  emits('editBtnClik', systemData)
}

//暴露给父组件的相关增删改查的方法
function fetchSystemList(formData: any = {}) {
  //当前页码和当前页数量
  const offset = (currentPage.value - 1) * pageSize.value
  const size = pageSize.value
  const pageInfo = {
    offset,
    size
  }
  //调用方法
  systemStore.fetchSystemListAction(
    {
      ...pageInfo,
      ...formData
    },
    props.contentConfig.pageName
  )
}
defineExpose({
  fetchSystemList
})
</script>

<style lang="less" scoped>
.page-content {
  margin-top: 40px;
  padding: 20px 10px;
  background-color: #fff;
  border-radius: 8px;
  .header {
    margin-bottom: 18px;
    display: flex;
    justify-content: space-between;
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-select {
      margin: 0 8px;
    }
  }
}
</style>
