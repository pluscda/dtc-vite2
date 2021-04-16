<template>
  <div id="dtc-login">
    <section class="login-panel">
      <h3 class="text-2xl text-white mb-11">基本醫療 / 重設密碼</h3>
      <el-input placeholder="使用者密碼1" v-model="name" class="">
        <template #prepend>
          <i-ri:lock-password-fill />
        </template>
      </el-input>
      <div class="mb-6"></div>
      <el-input placeholder="使用者密碼2" v-model="pwd" class="">
        <template #prepend>
          <i-ri:lock-password-fill />
        </template>
      </el-input>
      <div class="mb-10"></div>
      <el-button type="warning" class="max-w-md" round @click="login">重設密碼</el-button>
    </section>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import queryString from "qs";
import { ElMessage } from "element-plus";

export default {
  setup() {
    const actions = inject("actions");
    const name = ref("654321");
    const pwd = ref("654321");
    const router = useRouter();
    async function login() {
      try {
        const qs = location.href.split("?")[1];
        const code = queryString.parse(qs)?.code;
        //alert(code);
        const obj = {
          code,
          password: name.value,
          passwordConfirmation: pwd.value,
        };
        const { jwt, user } = await actions.resetPwdEx(obj);
        if (!jwt) throw "Incorrect code provided";
        sessionStorage.token = jwt;
        ElMessage.success({ message: "修改密碼成功,系統將自動導向", type: "success" });
        //toast.add({ severity: "success", summary: "修改密碼成功", detail: "系統將自動導向", life: 3000 });
        setTimeout(() => router.replace("/users"), 3000);
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
  background-image: url("//unsplash.it/1002/1002");
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
