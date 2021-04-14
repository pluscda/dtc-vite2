<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-7">忘記密碼 /重設密碼</h3>
      <el-input placeholder="使用者名稱" v-model="name" class="">
        <template #prepend>
          <i-ri:user-shared-fill />
        </template>
      </el-input>
      <div class="mb-2"></div>
      <el-input placeholder="使用者信箱" v-model="email2" class="">
        <template #prepend>
          <i-ri:user-shared-fill />
        </template>
      </el-input>
      <div class="mb-2"></div>
      <el-button type="warning" class="max-w-md" round @click="register">重設密碼</el-button>
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
    const obj = { email: email2.value };
    async function register() {
      //TODO: save jwt axios header
      const { jwt, user } = await actions.resetPwd(obj);
    }

    return { name, pwd, register, email2 };
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
