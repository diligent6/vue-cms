<template>
  <div class="department">
    <PageSearch
      :search-config="searchConfig"
      @reset-click="handleResetClick"
      @search-click="handleSerchClick"
    />
    <PageContent
      :content-config="contentConfig"
      ref="contentRef"
      @edit-btn-clik="handleEditClick"
      @create-btn-click="handleCreateClick"
    />
    <PageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'department'
}
</script>

<script lang="ts" setup>
import searchConfig from './config/serchConfig'
import contentConfig from './config/content.config'
import PageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

const contentRef = ref<InstanceType<typeof PageContent>>()
const modalRef = ref<InstanceType<typeof pageModal>>()
const handleResetClick = () => {
  contentRef.value?.fetchSystemList()
}
const handleSerchClick = (searchForm: any) => {
  contentRef.value?.fetchSystemList(searchForm)
}

const handleEditClick = (systemData: any) => {
  modalRef.value?.showModal(true, systemData)
}
const handleCreateClick = () => {
  modalRef.value?.showModal(false)
}
</script>

<style scoped></style>
