<template>
  <div class="main-menus">
    <!-- 1.顶部logo部分 -->
    <div class="header">
      <img src="@\assets\img\logo.svg" class="logo" />
      <h2 class="title">CMSADmin</h2>
    </div>
    <!-- 2. 菜单部分 -->
    <el-menu
      :collapse="isCollapse"
      default-active="2"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1">是打发打发</el-menu-item>
        <el-menu-item index="2">是打发打发</el-menu-item>
        <el-menu-item index="3">是打发打发</el-menu-item>
        <el-menu-item index="4">是打发打发</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.main-menus {
  height: 100%;
  background-color: #001529;
  .header {
    padding: 20px 0;
    padding-left: 10px;
    display: flex;
    align-items: center;
    .logo {
      width: 30px;
      height: 30px;
      margin: 0 10px;
    }
    .title {
      color: #fff;
    }
  }
  .el-menu {
    border-right: none;
    user-select: none;
    .el-sub-menu {
      .el-menu-item {
        padding-left: 50px !important;
        background-color: #0c2135;
      }
      .el-menu-item:hover {
        color: #fff;
      }
      .el-menu-item.is-active {
        background-color: #0a60bd;
      }
    }
  }
}
</style>
