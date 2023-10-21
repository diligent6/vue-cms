<template>
  <div class="user">
    <UserSearch @reset-click="handleRestClik" @search-click="handleSearchClick" />
    <UserContent
      ref="contentRef"
      @create-btn-click="handleCreateClick"
      @edit-btn-clik="handleEditClick"
    />
    <UserModal ref="modalRef" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'user'
}
</script>
<script lang="ts" setup>
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
const contentRef = ref<InstanceType<typeof userContent>>()

//处理搜索页面的相关事件
const handleRestClik = () => {
  contentRef.value?.fetchUserList()
}
const handleSearchClick = (formData: any) => {
  contentRef.value?.fetchUserList(formData)
}

//新建和编辑操作

const modalRef = ref<InstanceType<typeof userModal>>()
const handleCreateClick = () => {
  modalRef.value?.showModal()
}
const handleEditClick = (payload: any) => {
  modalRef.value?.showModal(true, payload)
}
</script>

<style scoped>
.user {
  padding: 20px 30px;
}
</style>
../../../../stores/main/system/user
