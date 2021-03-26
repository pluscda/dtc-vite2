<template>
  <div id="dtc-login">
    <ParticalLogin></ParticalLogin>
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-11">掛號門診登入</h3>
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
import ParticalLogin from "/@/components/ParticalLogin.vue";
export default {
  components: {
    ParticalLogin,
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  display: grid;
  place-items: center;
  height: 100vh;
}

.container {
  display: block;
}

.card {
  height: 370px;
  width: 400px;
  border-radius: 20px !important;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffc312;
}

.social_icon span:hover {
  color: white;
  cursor: pointer;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffc312;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: black;
  background-color: #ffc312;
  width: 100px;
}

.login_btn:hover {
  color: black;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
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
