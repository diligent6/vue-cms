<template>
  <div class="login-panel">
    <!-- 1. 标题 -->
    <h1 class="title">后台管理系统</h1>
    <!-- 2. tabs标签页 -->
    <el-tabs v-model="tabName" type="border-card" stretch class="tabs" @tab-change="changeClick">
      <!-- 2.1 标签导航 -->
      <el-tab-pane name="account">
        <template #label>
          <div class="tabs-label">
            <el-icon><UserFilled /></el-icon>
            <span class="label-text">账号登录</span>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane name="mobile">
        <template #label>
          <div class="tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="label-text">手机登录</span>
          </div>
        </template>
      </el-tab-pane>
      <!-- 2.2 输入框 -->
      <PanelAccount v-if="tabName === 'account'" ref="accountRef" />
      <PanelMobile v-else />
    </el-tabs>

    <!-- 3. 复选框 -->
    <div class="controls">
      <el-checkbox v-model="isChecked" label="记住密码" name="type" />
      <el-link :underline="false">忘记密码</el-link>
    </div>
    <el-button type="primary" size="large" @click="handleBtnClick">立即登录</el-button>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName } from 'element-plus'
import type panelAccountVue from './panel-account.vue'

//01-实现动态切换输入框功能
const tabName = ref('account')
const changeClick = (payload: TabPaneName) => {}

//02- 实现点击按钮登录的相关功能
// 记住密码
const isChecked = ref<boolean>(false)
const accountRef = ref<InstanceType<typeof panelAccountVue>>()
const handleBtnClick = () => {
  if (tabName.value === 'account') {
    accountRef.value?.loginAction(isChecked.value)
  } else {
    console.log('用户正在进行手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
  }

  .tabs {
    margin: 20px 0;
    .tabs-label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px;
      .label-text {
        margin-left: 5px;
      }
    }
  }
  .controls {
    display: flex;
    justify-content: space-between;
  }
  .el-button--large {
    width: 100%;
  }
}
</style>
