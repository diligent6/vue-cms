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
      :default-active="defaultActiveIndex"
      text-color="#b7bdc3"
      active-text-color="#fff"
      background-color="#001529"
    >
      <template v-for="(item, index) in userMenus" :key="index">
        <el-sub-menu :index="String(index)">
          <template #title>
            <el-icon>
              <component :is="item.icon.split('-icon-')[1]"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="iten in item.children" :key="iten.id">
            <el-menu-item :index="iten.id + ''" @click="menuItemClick(iten)"
              >{{ iten.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useLoginStore from '../../stores/login/login'
import { useRouter } from 'vue-router'
import { firstMenu } from '../../utils/map-menus'

//定义属性 其值让父组件传递进来
defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})

//从store中获取数据
const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)

const router = useRouter()

//默认页面
const defaultActiveIndex = firstMenu.id.toString()
router.push(firstMenu.url)

//监听点击事件并进行router导航
const menuItemClick = (item: any) => {
  router.push(item.url)
}
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
