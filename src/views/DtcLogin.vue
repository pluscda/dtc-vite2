<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-11">登入基本醫療服務</h3>
      <el-input placeholder="使用者信箱" v-model="name" class="">
        <template #prepend>
          <i-mdi:email></i-mdi:email>
        </template>
      </el-input>
      <div class="mb-6"></div>
      <el-input placeholder="使用者密碼" v-model="pwd" class="">
        <template #prepend>
          <i-ri:lock-password-fill />
        </template>
      </el-input>
      <div class="mb-10"></div>
      <el-button type="warning" class="max-w-md" round @click="login">登入</el-button>
      <footer class="flex justify-between hidden">
        <h4 class="pl-2 mt-4 text-sm text-left text-orange-200 cursor-pointer" @click.stop="$router.push('/dtcregister')">註冊帳戶</h4>
        <h4 class="relative float-right pl-2 mt-4 text-sm text-left text-orange-200 cursor-pointer" @click.stop="$router.push('/resetpwd')">忘記密碼</h4>
      </footer>
    </section>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const actions = inject("actions");
    const name = ref("14tc_14_16_03");
    const pwd = ref("654321");
    const router = useRouter();
    async function login() {
      try {
        // const { jwt, user, message } = await actions.login({ identifier: name.value, password: pwd.value });
        // sessionStorage.token = jwt;
        // jwt ? router.push("/register/list") : alert(JSON.stringify(message));
        sessionStorage.token = "12";
        actions.getAllDDL();
        router.push("/register/list");
      } catch (e) {
        alert("error: " + e);
      }
    }

    return { name, pwd, login };
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("//unsplash.it/998/998");
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

:deep(.el-input-group__append),
:deep(.el-input-group__prepend) {
  background-color: #ffc107;
  color: black;
}
</style>
