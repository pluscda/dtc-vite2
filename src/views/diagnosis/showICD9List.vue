<template>
  <Dialog
    header="選擇ICD9"
    :style="{ width: '50vw' }"
    v-model:visible="displayBasic"
    :modal="true"
    :closable="false"
  >
    <header
      class="
        dtc-grid-grumanagement-header dtc-grid-header dtc-template-columns
        mx-2
        dtc-color
      "
    >
      <div
        v-for="(item, i) in headers"
        :key="`${item}${i}dtc-grid-header`"
        :title="item.name"
      >
        {{ item.name }}
      </div>
    </header>
    <main
      class="
        dtc-grid-header dtc-grid-body dtc-template-columns
        text-black
        mx-2
        content
      "
      v-for="(item, i) in list"
      :key="i"
      :style="
        i % 2 == 0 ? 'background-color: #F5F5F5;' : 'background-color: #E0E0E0;'
      "
      @click="selectICD9(item)"
    >
      <div>{{ item.value }}</div>
      <div>{{ item.text }}</div>
    </main>
    <template #footer>
      <Button label="取消" icon="pi pi-check" @click="closeBasic" />
    </template>
  </Dialog>
</template>

<script>
import { ref, inject, computed, reactive } from "vue";
let headers = [{ name: "ICD9代碼" }, { name: "疾病名稱" }];
export default {
  name: "showicd9list",
  props: ["allICD9Optopns"],
  setup(props) {
    const global = inject("global");
    console.log("global", global);
    headers = ref(headers);
    let displayBasic = computed(() => {
      return global.showICD9Item;
    });
    let searchItem = computed(() => {
      return global.editItem;
    });

    let list = computed(() => {
      const filter = props.allICD9Optopns.filter((s) =>
        s.combine.includes(searchItem.value)
      );
      return filter;
    });

    let closeBasic = () => {
      global.showICD9Item = false;
    };
    let selectICD9 = (item) => {
      global.editItem = item.value;
      global.showICD9Item = false;
    };

    return {
      displayBasic,
      closeBasic,
      props,
      headers,
      list,
      searchItem,
      selectICD9,
    };
  },
};
</script>

<style lang="scss" scoped>
.dtc-color {
  background-image: none !important;
  background: #4b5563 !important;
  color: #fff;
  border-color: #9ca3af !important;
}
.dtc-template-columns {
  grid-template-columns: 120px 1fr;
}
.content:hover {
  background: #1f6ddb !important;
  color: #fff;
  cursor: pointer;
}
</style>
