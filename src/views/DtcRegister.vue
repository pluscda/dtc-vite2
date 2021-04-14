<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-7">基本醫療 / 註冊新帳戶</h3>
      <el-input placeholder="使用者名稱" v-model="name" class="">
        <template #prepend>
          <i-simple-icons:namecheap></i-simple-icons:namecheap>
        </template>
      </el-input>
      <div class="mb-2"></div>
      <el-input placeholder="使用者信箱" v-model="email2" class="">
        <template #prepend>
          <i-ri:user-shared-fill />
        </template>
      </el-input>
      <div class="mb-2"></div>
      <el-input placeholder="使用者密碼" v-model="pwd" class="">
        <template #prepend>
          <i-ri:lock-password-fill />
        </template>
      </el-input>
      <div class="mb-10"></div>
      <el-button type="warning" class="max-w-md" round @click="register">創建新帳戶</el-button>
      <footer class="flex justify-between">
        <h4 class="text-orange-200 text-sm mt-4 text-left pl-2 cursor-pointer" @click.stop="$router.push('/login')">登入帳戶</h4>
        <h4 class="text-orange-200 text-sm mt-4 text-left pl-2 cursor-pointer relative float-right" @click.stop="$router.push('/resetpwd')">忘記密碼</h4>
      </footer>
    </section>
  </div>
</template>

<script>
import { inject, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

export default {
  setup() {
    const email2 = ref("pluscda@gmail.com");
    const actions = inject("actions");
    const name = ref(dayjs().format("Dtc_HH_mm_ss"));
    const pwd = ref("123456");

    const router = useRouter();
    const obj = { username: name.value, email: email2.value, password: pwd.value };
    async function register() {
      const { jwt, user } = await actions.registerNewUser(obj);
      sessionStorage.token = jwt;
      router.push("/users");
    }

    return { name, pwd, register, email2 };
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("//unsplash.it/1004/1003");
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
