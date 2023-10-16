<template>
  <div class="panel-account">
    <el-form :model="formData" label-width="60px" status-icon :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="user">
        <el-input v-model="formData.user" clearable size="large" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" type="password" show-password size="large" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { type FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { USER_name, PASSWORD } from '../../../global/const'

interface FormData {
  user: string
  password: string
}
const formRef = ref<InstanceType<typeof ElForm>>()

//表单的数据模型
const formData = reactive<FormData>({
  user: localCache.getCache(USER_name),
  password: localCache.getCache(PASSWORD)
})
//验证规则
const rules: FormRules = {
  user: {
    required: true,
    message: '请输入用户名'
  },
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: ['blur', 'change']
    }
  ]
}

const LoginStore = useLoginStore()
function loginAction(isChecked: boolean) {
  formRef.value?.validate((isValid) => {
    //验证成功，进行登录成功的逻辑
    if (isValid) {
      //获取用户名和密码
      const name = formData.user
      const password = formData.password

      //发送网络请求
      LoginStore.loginAccountAction({ name, password }).then(() => {
        const token = LoginStore.token
        //登录失败
        if (!token) {
          console.log('用户名或者密码错误')
          ElMessage({
            message: '用户名或者密码错误',
            type: 'error'
          })
        }

        //登录成功
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        //记住密码
        if (isChecked) {
          localCache.setCache(USER_name, name)
          localCache.setCache(PASSWORD, password)
        } else {
          localCache.removeCache(USER_name)
          localCache.removeCache(PASSWORD)
        }
      })
    } else {
      //登录失败，给出提示信息
      ElMessage({
        message: '用户名或者密码错误',
        type: 'error'
      })
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
