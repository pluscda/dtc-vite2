<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-16">基本醫療 / 重設密碼</h3>

      <el-input placeholder="使用者信箱" v-model="email2" class="">
        <template #prepend>
          <i-mdi:email></i-mdi:email>
        </template>
      </el-input>
      <div class="mb-12"></div>
      <el-button type="warning" class="max-w-md" round @click="resetPwd">重設密碼</el-button>
      <footer class="flex justify-between mt-12">
        <h4 class="text-orange-200 text-sm mt-4 text-left pl-2 cursor-pointer relative float-right" @click.stop="$router.push('/login')">登入服務</h4>
        <h4 class="text-orange-200 text-sm mt-4 text-left pl-2 cursor-pointer" @click.stop="$router.push('/dtcregister')">註冊帳戶</h4>
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
    const router = useRouter();
    const obj = { email: email2.value };
    async function resetPwd() {
      await actions.resetPwd({ email: email2.value });
      alert("please check your email to reset your password");
    }

    return { resetPwd, email2 };
  },
};
</script>

<style lang="scss" scoped>
#dtc-login {
  background-image: url("//unsplash.it/1001/1001");
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
