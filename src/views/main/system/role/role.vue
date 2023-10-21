<template>
  <div class="role">
    <PageSearch :search-config="searchConfig" />
  </div>
</template>
<script lang="ts">
export default {
  name: 'role'
}
</script>
<script lang="ts" setup>
import searchConfig from './config/searchConfig'
</script>

<style scoped></style>
