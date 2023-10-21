<template>
  <div class="page-modal">
    <el-dialog v-model="dialogFormVisible" :title="isEdit ? '编辑' : '新建'">
      <el-form :model="formData" ref="formRef">
        <template v-for="item in props.modalConfig.formItems" :key="item.prop">
          <template v-if="item.type === 'select'">
            <el-select></el-select>
          </template>
          <template v-if="item.type === 'input'">
            <el-form-item :label="item.label" :label-width="item.width ?? '120'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placeholder"
                autocomplete="off"
              />
            </el-form-item>
          </template>
        </template>

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

interface IProps {
  modalConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
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
const initialFormData: any = {}
for (const item of props.modalConfig.formItems) {
  initialFormData[item.prop] = ''
}
const formData = reactive<IFormData>(initialFormData)
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
.page-modal {
  .el-form {
    padding-left: 60px;
    .el-form-item {
      width: 500px;
    }
  }
}
</style>
