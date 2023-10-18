import vue from '@vitejs/plugin-vue';
<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <MainMenus :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handFoldChange" :is-fold="isCollapse" />
        </el-header>
        <el-main class="content-section">
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
const isCollapse = ref(false)
const handFoldChange = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;

  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      text-align: left;
      cursor: pointer;

      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      // 隐藏侧边栏
      &::-webkit-scrollbar {
        display: none;
      }

      //添加动画
      transition: width 0.3s ease-in;
    }
  }
  .el-header {
    padding: 0;
  }
  .content-section {
    padding: 0;
    background-color: #f5f5f5;
  }
}
</style>
