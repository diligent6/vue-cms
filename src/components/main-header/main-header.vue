import type { emit } from 'process';
<template>
  <div class="main-header">
    <h2>main-header</h2>
    <el-button type="primary" @click="iconClick">点我试试</el-button>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['fold-change'])
const iconClick = () => {
  emits('fold-change')
}
</script>

<style lang="less" scoped>
.main-header {
  color: red;
}
</style>
