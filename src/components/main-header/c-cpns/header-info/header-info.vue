<template>
  <div class="header-info">
    <div class="item">
      <el-icon><Search /></el-icon>
    </div>
    <div class="item">
      <el-icon><Service /></el-icon>
    </div>
    <div class="item" @click="fullScreen">
      <el-icon><FullScreen /></el-icon>
    </div>
    <div class="item user-info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            src="https://api2.mubu.com/v3/photo/93f71b7c-8db2-4d8c-8452-36fb3071fe17.jpg"
            class="avatar"
          />
          墨渊
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="item">
      <el-icon><Setting /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { TOKEN } from '../../../../global/const'
import router from '@/router'
//退出登录
const loginOut = () => {
  localCache.removeCache(TOKEN)
  router.push('/login')
}

let isFullScreen = false
//进入全屏模式
const fullScreen = () => {
  if (!isFullScreen) {
    document.documentElement.requestFullscreen({ navigationUI: 'show' })
  } else {
    document.exitFullscreen()
  }
  isFullScreen = !isFullScreen
}
</script>

<style lang="less" scoped>
.header-info {
  height: 100%;
  display: flex;
  .item:hover {
    background-color: #f5f5f5;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
  }
  .user-info {
    width: 80px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 5px;
      }
    }
  }
  .el-icon {
    font-size: 18px;
  }
}
</style>
