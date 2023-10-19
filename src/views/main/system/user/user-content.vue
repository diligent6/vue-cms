<template>
  <div class="user-content">
    <!-- 顶部标题部分 -->
    <div class="header">
      <h2 class="title">用户列表</h2>
      <div class="operation">
        <el-button type="primary" @click="handleAddBtnClick">新增数据</el-button>
        <el-button type="danger">删除数据</el-button>
      </div>
    </div>
    <!-- 表格部分 -->
    <div class="table">
      <el-table :data="userList" style="width: 100%" border fit>
        <el-table-column type="selection" min-width="55" align="center" />
        <el-table-column type="index" min-width="90" label="序号" align="center" />

        <el-table-column prop="id" label="id" min-width="180" align="center" />
        <el-table-column prop="name" label="姓名" min-width="180" align="center" />
        <el-table-column prop="realname" label="真实姓名" min-width="180" align="center" />
        <el-table-column prop="cellphone" label="电话" min-width="180" align="center" />
        <el-table-column prop="enable" label="状态" min-width="180" align="center">
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
        <el-table-column prop="createAt" label="创建时间" min-width="240" align="center" />
        <el-table-column prop="updateAt" label="更新时间" min-width="240" align="center" />
        <el-table-column label="操作" min-width="180" align="center">
          <template #default="scope">
            <el-button size="small" @click="editBtnClik(scope.row)">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-popconfirm
              title="你确定删除吗?"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="handleDeleteClick(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger">
                  <el-icon><delete /></el-icon
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
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
      <!-- @size-change="handleSizeChange"
        @current-change="handleCurrentChange" -->
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'

//从store中获取表格数
const userStore = useSystemStore()
const pageSize = ref(10)
const currentPage = ref(1)
//保存当前页 和 页面数量

userStore.size = computed(() => {
  return pageSize.value
}) as any
userStore.offset = computed(() => {
  return (currentPage.value - 1) * pageSize.value
}) as any
fetchUserList()
const { userList, totalCount } = storeToRefs(userStore)

//处理状态切换的逻辑
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
  userStore.updateUserAction(userData.id, { enable: userData.enable })
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
  userStore.deleteUserByIdAction(userId)
}
const emits = defineEmits(['createBtnClick', 'editBtnClik'])
//新建按钮点击
const handleAddBtnClick = () => {
  emits('createBtnClick')
}
//编辑按钮点击
const editBtnClik = (userData: any) => {
  emits('editBtnClik', userData)
}

//暴露给父组件的相关增删改查的方法
function fetchUserList(formData: any = {}) {
  //当前页码和当前页数量
  const offset = (currentPage.value - 1) * pageSize.value
  const size = pageSize.value
  const pageInfo = {
    offset,
    size
  }
  //调用方法
  userStore.fetchUserListAction({
    ...pageInfo,
    ...formData
  })
}
defineExpose({
  fetchUserList
})
</script>

<style lang="less" scoped>
.user-content {
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
../../../../stores/main/system/user
