<template>
  <div class="panel-moile">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.panel-moile {
  .verify-code {
    .get-btn {
      margin-left: 20px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
