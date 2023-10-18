import type { emit } from 'process'; import { default } from '../../router/main/system/menu/menu';
<template>
  <div class="main-header">
    <div class="header-top">
      <div class="left">
        <!-- 1.折叠图标部分 -->
        <div class="icon" @click="iconClick">
          <el-icon v-if="isFold"><Expand /></el-icon>
          <el-icon v-else><Fold /></el-icon>
        </div>
        <!-- 2.面包屑导航 -->
        <HeaderCrumb />
      </div>
      <!-- 右侧icoon图标 -->
      <div class="right">
        <!-- 3.右侧用户信息等 -->
        <HeaderInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
//传出点击事件
const emits = defineEmits(['fold-change'])
const iconClick = () => {
  emits('fold-change')
}
</script>

<style lang="less" scoped>
.main-header {
  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;

    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        font-size: 25px;
      }
    }
    .right {
      height: 100%;
    }
  }
}
</style>
