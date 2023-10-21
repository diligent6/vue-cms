<template>
  <div class="page-search">
    <div class="header"></div>
    <!--输入框表单部分  -->
    <el-form
      :model="searchForm"
      ref="formRef"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
    >
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 底部按钮部分 -->
    <div class="footer">
      <el-button class="reset" color="#ecf5ff" @click="handleResetClick">
        <el-icon><Refresh /></el-icon>
        重置</el-button
      >
      <el-button class="search" type="primary" :icon="Search" @click="handleSerchClick">
        搜索</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'

import type { ElForm } from 'element-plus'
import { usePermissons } from '@/hooks/usePermissons'
import { ISearchConfig } from '@/types/components/page-search'

const isQuery = ref(usePermissons('system:users:query'))

interface IProps {
  searchConfig: ISearchConfig
}
const props = defineProps<IProps>()

//定义表单数据对象
//初始化数据对象
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialForm)

const emits = defineEmits(['resetClick', 'searchClick'])
//重置按钮的点击，刷新页面 调用action进行一次请求
const formRef = ref<InstanceType<typeof ElForm>>()

const handleResetClick = () => {
  //清空搜索框信息
  formRef.value?.resetFields()

  emits('resetClick')
}

//查询用户的操作
const handleSerchClick = () => {
  emits('searchClick', searchForm)
}
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;

  .header {
    padding: 10px;
  }
  .el-row {
    margin: 0 !important;
  }
  .el-form-item {
    margin-top: 20px;
    width: 100%;
    .el-select {
      width: 100%;
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .reset {
      color: #409eff;
    }
    .reset,
    .search {
      width: 80px;
    }
  }
}
</style>
