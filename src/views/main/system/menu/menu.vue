<template>
  <div class="menu">
    <PageSearch :search-config="searchconfig" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'menuPge'
}
</script>

<script setup lang="ts">
import searchconfig from './config/serch.config'
</script>
<style scoped></style>
./config/serch.config