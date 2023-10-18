<template>
  <div class="not-found">
    <el-result icon="error" title="404" sub-title="The Page Not Found">
      <template #extra>
        <el-button type="primary" @click="backBtnClick">Back</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const backBtnClick = () => {
  router.push('/main')
}
</script>

<style lang="less" scoped></style>
