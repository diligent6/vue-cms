<template>
  <div class="user-modal">
    <el-dialog v-model="dialogFormVisible" :title="isEdit ? '编辑' : '新建'">
      <el-form :model="formData" ref="formRef">
        <el-form-item label="用户名" :label-width="120">
          <el-input v-model="formData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="真实姓名" :label-width="120">
          <el-input v-model="formData.realname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="120" v-if="!isEdit">
          <el-input v-model="formData.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话号码" :label-width="120">
          <el-input v-model="formData.cellphone" autocomplete="off" />
        </el-form-item>
        <!-- <el-form-item label="选择部门" :label-width="120">
          <el-input v-model="formData.department" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选择角色" :label-width="120">
          <el-input v-model="formData.role" autocomplete="off" />
        </el-form-item> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirClick">确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import type { ElForm } from 'element-plus'
//1.定义相关数据
//是否是编辑
const isEdit = ref(false)
//模态框表单数据模型
interface IFormData {
  [name: string]: string
  realname: string
  password: string
  cellphone: string
}
const formData = reactive<IFormData>({
  name: '',
  realname: '',
  password: '',
  cellphone: ''
})
const editData = ref({
  id: '',
  name: '',
  realname: '',
  password: '',
  cellphone: ''
})
const systemStore = useSystemStore()

//控制模态框的显示和隐藏
const dialogFormVisible = ref(false)

// 2. 创建/编辑用户的逻辑
//展示模态框
function showModal(isEditValue: boolean = false, userData?: any) {
  dialogFormVisible.value = true
  isEdit.value = isEditValue
  for (const key in formData) {
    formData[key] = ''
  }
  if (isEdit.value && userData) {
    editData.value = userData
    for (const key in formData) {
      formData[key] = userData[key]
    }
  }
}

//确认按钮点击
const handleConfirClick = () => {
  //关闭模态框
  dialogFormVisible.value = false
  if (isEdit.value) {
    systemStore.updateUserAction(editData.value.id, {
      ...formData,
      roleId: 491,
      departmentId: 397
    })
  } else {
    //发送网络请求
    systemStore.createUserAction({ ...formData, roleId: 491, departmentId: 397 })
  }
}
defineExpose({
  showModal
})
</script>

<style lang="less" scoped>
.user-modal {
  .el-form {
    padding-left: 60px;
    .el-form-item {
      width: 500px;
    }
  }
}
</style>
