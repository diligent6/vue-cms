<template>
  <div class="user-content">
    <div class="header">
      <h2 class="title">用户列表</h2>
      <div class="operation">
        <el-button type="primary">新增数据</el-button>
        <el-button type="danger">删除数据</el-button>
      </div>
    </div>
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
              :loading="isLoading"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              @click="handleStatusChange"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" min-width="240" align="center" />
        <el-table-column prop="updateAt" label="更新时间" min-width="240" align="center" />
        <el-table-column label="操作" min-width="180" align="center">
          <template #default="scope">
            <el-button size="small">
              <el-icon><Edit /></el-icon>
            </el-button>
            <el-button size="small" type="danger">
              <el-icon><delete /></el-icon
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '../../../../stores/main/user'
import { storeToRefs } from 'pinia'

//从store中获取表格数
const userStore = useUserStore()
const { userList } = storeToRefs(userStore)

//处理状态切换的逻辑
const isLoading = ref(false)
const handleStatusChange = () => {
  isLoading.value = true
  console.log(userList.value)
  setTimeout(() => {
    isLoading.value = false
    ElNotification({
      message: '更新成功',
      type: 'success',
      showClose: true
    })
  }, 300)
}
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
}
</style>
