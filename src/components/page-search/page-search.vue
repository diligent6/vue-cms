<template>
  <div class="page-search">
    <div class="header"></div>
    <!--输入框表单部分  -->
    <el-form :model="formData" :inline="true" class="demo-form-inline">
      <el-row>
        <el-col :span="8">
          <el-form-item label="id" label-width="160px">
            <el-input placeholder="请输入id" clearable v-model="formData.id" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名" label-width="160px">
            <el-input placeholder="请输入用户名" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" label-width="160px">
            <el-input placeholder="请输入真实姓名" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电话号码" label-width="160px">
            <el-input placeholder="请输入电话号码" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态" label-width="160px">
            <el-select placeholder="请输入用户状态">
              <el-option label="启用" value="shanghai" />
              <el-option label="禁用" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" label-width="160px">
            <el-date-picker
              v-model="formData.dateRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 底部按钮部分 -->
    <div class="footer">
      <el-button class="reset" color="#ecf5ff">
        <el-icon><Refresh /></el-icon>
        重置</el-button
      >
      <el-button class="search" type="primary" :icon="Search"> 搜索</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
//定义表单数据对象

const formData = reactive({
  id: '',
  userName: '',
  realName: '',
  phoneNumber: '',
  status: '',
  createAt: ''
})
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 10px;
  .header {
    padding: 10px;
  }
  .el-row {
    margin: 0 !important;
  }
  .el-form-item {
    margin-top: 20px;
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .reset {
      color: #409eff;
    }
    .reset,
    .search {
      width: 80px;
    }
  }
}
</style>
