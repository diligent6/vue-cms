<template>
  <div class="user">
    <UserSearch />
    <UserContent />
  </div>
</template>

<script lang="ts">
export default {
  name: 'user'
}
</script>
<script lang="ts" setup>
import useUserStore from '../../../../stores/main/user'

//发送网络请求获取数据
const userStore = useUserStore()
userStore.fetchUserListAction()
</script>

<style scoped>
.user {
  padding: 20px 30px;
}
</style>
