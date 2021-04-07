<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-11">基本醫療服務登入</h3>
      <el-input placeholder="使用者名稱" v-model="input1" class="">
        <template #prepend>
          <i-ri:user-shared-fill />
        </template>
      </el-input>
      <div class="mb-6"></div>
      <el-input placeholder="使用者密碼" v-model="input1" class="">
        <template #prepend>
          <i-ri:lock-password-fill />
        </template>
      </el-input>
      <div class="mb-10"></div>
      <el-button type="warning" class="max-w-md" round @click="$router.push('/')">登入</el-button>
    </section>
  </div>
</template>

<script>
import ParticalLogin from "cps/ParticalLogin.vue";
export default {
  components: {
    ParticalLogin,
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("loginbg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.login-panel {
  height: 370px;
  width: 400px;
  border-radius: 20px !important;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6) !important;
  display: flex;
  flex-direction: column;
  text-align: center;
  z-index: 99999;
}

::v-deep .el-input-group__append,
::v-deep .el-input-group__prepend {
  background-color: #ffc107;
  color: black;
}
</style>
