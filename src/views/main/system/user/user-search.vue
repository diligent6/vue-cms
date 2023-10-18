<template>
  <div class="user-search">
    <div class="header"></div>
    <!--输入框表单部分  -->
    <el-form :model="formData" :inline="true" :rules="rules">
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="id" label-width="80px">
            <el-input placeholder="请输入id" clearable v-model="formData.id" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名" label-width="80px">
            <el-input placeholder="请输入用户名" clearable v-model="formData.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" label-width="80px">
            <el-input placeholder="请输入真实姓名" clearable v-model="formData.realName" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="8">
          <el-form-item label="电话号码" label-width="80px" prop="phoneNumber">
            <el-input placeholder="请输入电话号码" clearable v-model="formData.phoneNumber" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户状态" label-width="80px">
            <el-select placeholder="请输入用户状态" v-model="formData.status">
              <el-option label="启用" value="true" />
              <el-option label="禁用" value="false" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" label-width="80px">
            <el-date-picker
              v-model="formData.createAt"
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
import { type FormRules } from 'element-plus'
//定义表单数据对象

const formData = reactive({
  id: '',
  userName: '',
  realName: '',
  phoneNumber: '',
  status: '',
  createAt: ''
})
const rules: FormRules = {
  phoneNumber: [
    {
      pattern: /^[0-9]*$/,
      message: '必须是数字',
      trigger: 'change'
    }
  ]
}
</script>

<style lang="less" scoped>
.user-search {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;

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
