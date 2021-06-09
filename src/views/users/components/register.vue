<template>
  <div class="pl-1 pr-1">
    <header class="dtc-page-header dtc-page-header-grid grid text-white relative">
      <div>掛號作業</div>
      <div></div>
      <Button label="進行查詢" icon="pi pi-search" class="p-button-small" style="margin: 4px" />
      <Button label="清除查詢" class="p-button-warning p-button-small" style="margin: 4px" icon="pi pi-undo" />
    </header>
    <main class="grid gap-2 grid-cols-2" style="grid-template-rows: 40px">
      <DtxInputGroup prepend="掛號日期">
        <Calendar @date-select="getOptDepartment" class="h-10 w-full" v-model="regTime" placeholder="請輸入日期" :showIcon="true" dateFormat="yy-mm-dd" />
      </DtxInputGroup>
      <DtxInputGroup prepend="看診科別">
        <el-select filterable v-model="dept" placeholder="請選擇" class="border-l-0" @change="getOptSpecialty">
          <el-option v-for="item in deptt" :key="item.departmentId" :label="item.departmentName" :value="item.departmentId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="項次科別">
        <el-select filterable v-model="specialty" placeholder="請選擇" class="border-l-0" @change="getOptShift">
          <el-option v-for="item in specialtyy" :key="item.specialtyId" :label="item.specialtyName" :value="item.specialtyId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診醫師">
        <el-select filterable v-model="shift" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in shiftt" :key="item.shiftId" :label="item.doctorName" :value="item.shiftId"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="看診時段">
        <el-select filterable v-model="value" placeholder="請選擇" class="border-l-0">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </DtxInputGroup>
      <DtxInputGroup prepend="調閱病歷">
        <el-input placeholder="搜尋身份證字號" v-model="input1" readonly class="bg-gray-300" />
      </DtxInputGroup>
    </main>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "regsiter",
  components: {},
  inject: ["actions", "global"],
  data() {
    return {
      dept: "",
      deptt: [],
      specialty: "",
      specialtyy: [],
      shift: "",
      shiftt: [],
      regTime: dayjs().format("YYYY-MM-DD"),
    };
  },
  methods: {
    async getOptShift() {
      // when 項次科別 change.
      this.cleanAll(["dept", "deptt", "specialtyy", "specialty", "regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptShift(time, this.specialty);
        this.shiftt = entry;
      } catch (e) {
        alert(e);
      }
    },
    async getOptSpecialty() {
      // when 看診科別 change.
      this.cleanAll(["dept", "deptt", "regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptSpecialty(time, this.dept);
        this.specialtyy = entry;
      } catch (e) {
        alert(e);
      }
    },
    async getOptDepartment() {
      // when 掛號日期 change.
      if (!this.regTime) return;
      this.cleanAll(["regTime"]);
      try {
        const time = dayjs(this.regTime).format("YYYY-MM-DD") + this.global.zeros;
        const { entry } = await this.actions.getOptDepartmentByDate(time);
        this.deptt = entry;
      } catch (e) {
        alert("getOptDepartmentByDate: " + e);
      }
    },
    cleanAll(skips) {
      Object.keys(this.$data).forEach((s) => {
        if (!skips.find((key) => key === s)) this.$data[s] = "";
      });
    },
  },
  async mounted() {
    this.getOptDepartment();
  },
};
</script>

<style lang="scss" scoped>
.dtc-template-columns {
  grid-template-columns: 180px repeat(2, 160px) 1fr;
}

.dtc-page-header-grid {
  grid-template-columns: max-content 1fr max-content max-content;
  overflow: hidden;
  gap: 1rem;
}
</style>
