import type path from 'path'; import type path from 'path';
<template>
  <div class="header-crumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadCrums" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }} </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useLoginStore from '@/stores/login/login'

import { useRoute } from 'vue-router'
import { mapPathToBreadCrums } from '../../../../utils/map-menus'
//从store中获取数据
const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)
const route = useRoute()
const breadCrums = computed(() => {
  return mapPathToBreadCrums(route.path, userMenus.value)
})
</script>

<style lang="less" scoped>
.header-crumb {
  margin-left: 12px;
  .is-link {
    cursor: Pointer;
  }
}
</style>
